const quickNav = document.getElementById("quick-nav")
for (let i = 1; i <= 20; i++){
    const el = document.createElement("div")
    el.textContent = i
    // if() click vao o quick nav nao thi => bthi đc chon => active =>...classList.add("active")
    quickNav.appendChild(el)
}
// quickNav.addEventListener("click", (element) => {
//     if(element.target.)
// })