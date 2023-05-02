import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://eclass.dongguk.edu/Main.do*"],
  css: ["main.css"]
}

window.addEventListener("load", () => {
  // setTimeout(() => {
  console.log("동국대 Extended Eclass - CSE 18th BCH")

  // const newHeader = document.createElement("div")
  // newHeader.textContent = "동국대 Extended Eclass - Enabled"
  // newHeader.className = "bisue-header"

  // const header = document.querySelector("#header") as HTMLElement
  // header.style.transition = "background 0.5s"
  // header.style.background = "#bae6fd"
  // header.style.color = "#171717"

  header.insertBefore(newHeader, header.firstChild)

  // const dummy = document.createElement("div")
  // dummy.style.height = "80px"
  // const container = document.querySelector("#container") as HTMLElement
  // container.insertBefore(dummy, container.firstChild)
  // }, 1000)
})
