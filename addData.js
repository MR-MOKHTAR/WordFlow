import fs from "fs";

async function test() {
  const result = await fs.promises.readFile("./qa_data.json", "utf-8");
  const data = await JSON.parse(result);

  const newData = data.map((item) => ({
    id: crypto.randomUUID(),
    content: `<p>${item.question}</p> <p>${item.answer}</p>`,
  }));

  console.log(newData[1]);

  // await fs.promises.writeFile("note.json", JSON.stringify(newData));
  await fs.promises.writeFile("note.json", JSON.stringify(newData));

  console.log(data[1].id);
}
test();
