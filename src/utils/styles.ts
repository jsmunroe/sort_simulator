function cssKeyToCamelCase(key: string): string {
    return key.replace(/-([a-z])/g, (_match, letter) => letter.toUpperCase());
}

export const getStyles = (selector: string) => {
    let styles: { [key: string]: string } = {};

    for (const styleSheet of document.styleSheets) {
        for (const rule of styleSheet.cssRules) {
            if (rule instanceof CSSStyleRule && rule.selectorText === selector) {
                const style = rule.style;
                for (let i = 0; i < style.length; i++) {
                    let key = style.item(i);
                    const value = style.getPropertyValue(key);

                    if (!key || !value) {
                        continue;
                    }

                    styles[key] = value;

                    key = cssKeyToCamelCase(key);

                    styles[key] = value;
                }
            }
        }
    }

    return styles as unknown as CSSStyleDeclaration;
}

export const getStylesForClass = (className: string) => {
    const div = document.createElement('div');
    div.classList.add(className);

    document.body.appendChild(div);

    const styles = {...window.getComputedStyle(div)}

    document.body.removeChild(div);

    return styles;
}