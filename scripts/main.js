let FACTOR = 1;

function* typewriter(text, element) {
    for (let i = 0; i < text.length + 1; i++) {
        element.innerText = text.slice(0, i);
        yield element.getAttribute("speed") || 100;
    }
    return;
}

function* iter(iterable) {
    for (const value of iterable) {
        yield value;
    }
}

function main() {
    const writers = Array.from(document.getElementById("writerPage").children);

    const writerPull = iter(writers.map(writer => {
        const text = writer.innerText;
        writer.innerText = "";

        return { element: writer, writer: typewriter(text, writer), delay: writer.getAttribute("delay") || 500 };
    }));

    const writersLine = () => {
        const { value: data, done } = writerPull.next();
        if (!done) {
            const { element, writer, delay } = data;
            element.classList.add("cursor");
            const fn = () => {
                const { value: speed, done } = writer.next();
                if (!done) {
                    setTimeout(fn, Number(speed) / FACTOR);
                } else {
                    element.classList.remove("cursor");
                    setTimeout(writersLine, Number(delay) / FACTOR);
                }
            }
            setTimeout(fn, delay);
        }
    }

    setTimeout(writersLine, 500);
}

function reset() { main(); }

window.onload = main;
