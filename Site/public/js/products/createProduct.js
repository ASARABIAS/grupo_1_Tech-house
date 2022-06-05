window.onload = () => {

    const productImage = document.getElementById("productImage");
    const imagePreview = document.querySelectorAll(".imagePreview");
    productImage.addEventListener("change", function(e) {
        if (e.target.value) {
            // this ---> Input file (Elemento el cual presenta el evento)
            readURL(this);
        } else {
            imagePreview.forEach(image => {
                image.setAttribute("src", "/images/logo.png");
            });
        }
    })

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                //alert(e.target.result);
                imagePreview.forEach(image => {
                    image.setAttribute("src", e.target.result);
                });
            }

            reader.readAsDataURL(input.files[0]);
        }
    }
};