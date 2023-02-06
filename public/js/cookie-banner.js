document.addEventListener('DOMContentLoaded', () => {

    /**
     * Set the variables that interacts with the DOM
     */
    const cookie_banner = document.getElementById('cookie_policy');
    const cookie_btn_accept = document.getElementById('accept');
    const cookie_btn_more = document.getElementById('more');

    /**
     * Display cookie banner if localStorage "cookie_consent" does not exist
     * otherwise does not display the cookie banner.
     * If the localStorage "cookie_consent" does not exist, fire event click,
     * if the user click on 'accept' hide cookie banner.
     */
    if (localStorage.getItem("cookie_consent")) {
        cookie_banner.style.display = "none";
    } else {
        cookie_btn_accept.addEventListener('click', function() {
            localStorage.setItem("cookie_consent", "accept");
            cookie_banner.style.display = "none";
        });

        cookie_btn_more.addEventListener('click', function() {
            localStorage.setItem("cookie_consent", "accept");
            cookie_banner.style.display = "none";
        });
    }
    
})