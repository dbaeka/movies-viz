export default () => {
    /* eslint-disable-next-line no-restricted-globals */
    self.addEventListener("message", async event => {
        const imageURL = event.data;

        const response = await fetch(imageURL);
        const blob = await response.blob();

        // Send the image data to the UI thread!
        /* eslint-disable-next-line no-restricted-globals */
        self.postMessage({
            imageURL: imageURL,
            blob: blob,
        })
    });
};