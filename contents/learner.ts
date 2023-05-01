import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://eclass.dongguk.edu/Learner.do*"]
  //   css: ["learner.css"]
}

async function deblurring(document) {
  try {
    const ids = [
      ...document.querySelectorAll(
        '#listBox input[type="checkbox"]:not(#checkAll)'
      )
    ].map((e) => e.value)
    const url = `https://eclass.dongguk.edu/Message.do?cmd=sendMessageForm&gubun=popup&messageSendDTO.receiverId=${ids.join(
      ","
    )}&messageSendDTO.courseId=`

    const response = await fetch(url)
    const rawHtml = await response.text()

    const parser = new DOMParser()
    const doc = parser.parseFromString(rawHtml, "text/html")

    const names = (
      doc.querySelector(".boardListPopup tr:first-child td") as HTMLElement
    ).innerText
      .trim()
      .split(",")

    const courseName = document
      .querySelector("#headerContent a")
      .innerText.trim()
    let message = `%c[${courseName}] 수강자 목록\n\n%c`
    message += ids.map((id, idx) => `\t${id} / ${names[idx]}`).join("\n")
    message += `\n\nmade by CSE 18th`
    console.log(
      message,
      "color: #ffffff; background-color: #047857; font-size: 1.25rem; font-weight: bold;",
      "color: #ffffff; font-size: 1rem; line-height: 1.6;"
    )

    const nameSlots = document.querySelectorAll(
      "#listBox .boardListBasic tbody tr td:last-child"
    )
    const idSlots = document.querySelectorAll(
      "#listBox .boardListBasic tbody tr td:nth-child(5)"
    )
    names.forEach((name, idx) => {
      nameSlots[idx].innerHTML = name
    })
    ids.forEach((id, idx) => {
      idSlots[idx].innerHTML = id
    })
  } catch (e) {
    alert(`뭔가 꼬임!\n${e.message}`)
  }
}

window.addEventListener("load", () => {
  const frame = document.querySelector("frame[name='main']") as HTMLFrameElement
  if (frame) {
    deblurring(frame.contentDocument)
  } else {
    deblurring(document)
  }
})
