let tablinks = document.getElementsByClassName("tab-links");
let tabcontents = document.getElementsByClassName("tab-contents");

                function opentab(tabname) {
                    for (tablink of tablinks) {
                        tablink.classList.remove("active-link");
                    }
                    for (tabcontent of tabcontents) {
                        tabcontent.classList.remove("active-tab");
                    }
                    event.currentTarget.classList.add("active-link");
                    document.getElementById(tabname).classList.add("active-tab");
                }
            
                let sidemenu = document.getElementById("sidemenu");

                function openmenu() {
                    sidemenu.style.right = "0";
        

                }
                function closemenu() {
                    sidemenu.style.right = "-1200px";
                }
                const links = sidemenu.querySelectorAll('a');
                links.forEach(link => {
                    link.addEventListener('click', (event) => {
                        closemenu()
                    })
                })
