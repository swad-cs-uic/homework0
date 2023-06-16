import "./style.css";
import uicLogo from "/uic.svg";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<a href="https://484.cs.uic.edu" target="_blank">
<img src="${uicLogo}" class="logo uic" alt="UIC logo" />
</a>
    <div class="card">
    welcome to the website of ckanich@uic.edu. 
    </div>
`;
