import { useState, useEffect, useRef } from 'react';
import type { SvgLayer, ComponentCategory } from '../types';

const svgCache = new Map<string, string>();
const pendingRequests = new Map<string, Promise<string>>();

function buildSvgPath(category: ComponentCategory, variant: number, layer: SvgLayer): string {
  const layerDir = layer === 'full' ? 'full' : layer === 'lines' ? 'lines' : 'shapes';
  return `/svg/${layerDir}/${category}_${variant}.svg`;
}

function colorize(svgContent: string, color?: string, secondaryColor?: string): string {
  if (!color && !secondaryColor) return svgContent;

  let result = svgContent;

  if (color) {
    result = result.replace(/fill:\s*#fff\b/gi, `fill:${color}`);
    result = result.replace(/fill="#fff"/gi, `fill="${color}"`);
    result = result.replace(/fill="#ffffff"/gi, `fill="${color}"`);
    result = result.replace(/fill:\s*#ffffff\b/gi, `fill:${color}`);
    result = result.replace(/fill="white"/gi, `fill="${color}"`);
  }

  if (secondaryColor) {
    result = result.replace(/opacity:\s*\.24/gi, `opacity:1`);
    const opacityRegex = /(<[^>]*class="cls-1"[^>]*>)/gi;
    result = result.replace(opacityRegex, (match) => {
      return match.replace(/fill:\s*[^;"]+/i, `fill:${secondaryColor}`);
    });
  }

  return result;
}

function stripSvgWrapper(svgContent: string): { inner: string; viewBox: string } {
  const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 100 100';

  const innerMatch = svgContent.match(/<svg[^>]*>([\s\S]*)<\/svg>/i);
  const inner = innerMatch ? innerMatch[1] : svgContent;

  return { inner, viewBox };
}

async function fetchSvg(url: string): Promise<string> {
  if (svgCache.has(url)) {
    return svgCache.get(url)!;
  }

  if (pendingRequests.has(url)) {
    return pendingRequests.get(url)!;
  }

  const promise = fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to load SVG: ${url}`);
      return res.text();
    })
    .then((text) => {
      svgCache.set(url, text);
      pendingRequests.delete(url);
      return text;
    })
    .catch((err) => {
      pendingRequests.delete(url);
      throw err;
    });

  pendingRequests.set(url, promise);
  return promise;
}

export interface UseSvgLoaderResult {
  svgContent: string | null;
  viewBox: string;
  isLoading: boolean;
  error: string | null;
}

export function useSvgLoader(
  category: ComponentCategory,
  variant: number,
  layer: SvgLayer,
  color?: string,
  secondaryColor?: string
): UseSvgLoaderResult {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [viewBox, setViewBox] = useState('0 0 100 100');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const url = buildSvgPath(category, variant, layer);

    fetchSvg(url)
      .then((raw) => {
        if (cancelled || !mountedRef.current) return;
        const colored = colorize(raw, color, secondaryColor);
        const { inner, viewBox: vb } = stripSvgWrapper(colored);
        setSvgContent(inner);
        setViewBox(vb);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        if (cancelled || !mountedRef.current) return;
        setError(err.message);
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [category, variant, layer, color, secondaryColor]);

  return { svgContent, viewBox, isLoading, error };
}

export function preloadSvgs(category: ComponentCategory, variants: number[], layers: SvgLayer[] = ['full']): void {
  for (const variant of variants) {
    for (const layer of layers) {
      const url = buildSvgPath(category, variant, layer);
      fetchSvg(url).catch(() => {});
    }
  }
}
