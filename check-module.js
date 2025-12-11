try {
    require.resolve('babel-preset-expo');
    console.log('Success: babel-preset-expo found');
} catch (e) {
    console.error('Error: babel-preset-expo NOT found');
    console.error(e.message);
}

try {
    require.resolve('babel-plugin-module-resolver');
    console.log('Success: babel-plugin-module-resolver found');
} catch (e) {
    console.error('Error: babel-plugin-module-resolver NOT found');
    console.error(e.message);
}
