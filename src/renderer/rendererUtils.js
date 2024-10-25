export function drawRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
}

export function getTileColor(value) {
    const tileColors = {
        2: '#eee4da',
        4: '#eee0c6',
        8: '#f9b377',
        16: '#ff9b60',
        32: '#cb6a49',
        64: '#ec6233',
        128: '#e8c463',
        256: '#e0ba55',
        512: '#f3c54b',
        1024: '#f2c138',
        2048: '#f3bd29',
    };

    return tileColors[value] || '#cfc0af';
}
