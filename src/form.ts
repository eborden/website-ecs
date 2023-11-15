export function init () {
  const form = document.querySelector('form')
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const rsp = await fetch(form.action, {
      method:form.method,
      body: new FormData(form)
    })
    if (rsp.ok) {
      form.reset()
      const confirm = document.createElement("span");
      confirm.innerHTML = ' sent &#128077;'
      form.querySelector('button').after(confirm)
      setTimeout(() => confirm.remove(), 1000)
    } else {
      const body = await rsp.text()
      console.error(body)
      const err = document.createElement("span");
      err.innerHTML = ' failed &#128077;'
      form.querySelector('button').after(err)
      setTimeout(() => err.remove(), 1000)
    }
  })
}
