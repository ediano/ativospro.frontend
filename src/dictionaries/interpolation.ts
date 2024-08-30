export const interpolation = (text: string, props: Record<string, any>) => {
  const nextText = Object.entries(props).reduce((results, [key, value]) => {
    if (!results) {
      const nextText = text.replace(`{{${key}}}`, value);
      return nextText;
    }

    const nextText = results.replace(`{{${key}}}`, value);
    return nextText;
  }, "");

  return nextText;
};