const FONTS_CSS_URL =
  'https://fonts.googleapis.com/css2?family=Noto+Serif+Hebrew:wght@300;400&family=Frank+Ruhl+Libre:wght@300;400;500;700&family=Cormorant+Garamond:wght@400;500&display=swap';

export async function buildFontEmbedCss(): Promise<string> {
  try {
    const css = await (await fetch(FONTS_CSS_URL)).text();
    const urls = [...new Set([...css.matchAll(/url\((https:[^)]+)\)/g)].map((m) => m[1]))];
    let out = css;
    await Promise.all(
      urls.map(async (u) => {
        const blob = await (await fetch(u)).blob();
        const data = await new Promise<string>((res) => {
          const r = new FileReader();
          r.onload = () => res(r.result as string);
          r.readAsDataURL(blob);
        });
        out = out.split(u).join(data);
      }),
    );
    return out;
  } catch {
    return '';
  }
}
