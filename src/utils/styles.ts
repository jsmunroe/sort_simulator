export const getStyles = (selector: string) => {
    const styles: Partial<CSSStyleDeclaration> = {};

    for (const styleSheet of document.styleSheets) {
        for (const rule of styleSheet.cssRules) {
            if (rule instanceof CSSStyleRule && rule.selectorText === selector) {
                const style = rule.style;
                for (const key of style) {
                    if (typeof style[key as keyof CSSStyleDeclaration] === 'function' || 
                        key === 'length' || 
                        key === 'parentRule' || 
                        typeof key === 'number') {
                        continue;
                    }
                    
                    (styles as Record<string, string>)[key] = style.getPropertyValue(key);
                }
            }
        }
    }

    return styles;
}