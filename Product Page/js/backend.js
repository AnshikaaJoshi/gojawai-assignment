document.addEventListener("DOMContentLoaded", function () {

    // ===============================
    // ENQUIRY FORMS
    // ===============================

    const enquiryForms = document.querySelectorAll("form.wpcf7-form");

    enquiryForms.forEach(function (form) {

        form.addEventListener("submit", async function (event) {

            event.preventDefault();

            const submitButton = form.querySelector(
                'input[type="submit"], button[type="submit"]'
            );

            if (submitButton) {
                submitButton.disabled = true;

                if (submitButton.tagName === "INPUT") {
                    submitButton.value = "Submitting...";
                } else {
                    submitButton.innerText = "Submitting...";
                }
            }

            const formData = new FormData(form);

            const data = {
                type: "enquiry",

                name:
                    formData.get("your-name") ||
                    formData.get("full_name") ||
                    "",

                email:
                    formData.get("your-email") ||
                    formData.get("your_email") ||
                    "",

                phone:
                    formData.get("your-phone") ||
                    formData.get("phone_number") ||
                    "",

                date:
                    formData.get("your-date") ||
                    "",

                travellers:
                    formData.get("travel-number") ||
                    "",

                message:
                    formData.get("your-query") ||
                    formData.get("message") ||
                    ""
            };

            console.log("Sending enquiry:", data);

            try {

                const response = await fetch("https://gojawai-backend-o0i1gwqwc-anshika19.vercel.app/api/enquiries", {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(data)
                    }
                );

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(
                        result.message || "Something went wrong"
                    );
                }

                alert(
                    "Your enquiry has been submitted successfully!"
                );

                form.reset();

            } catch (error) {

                console.error("Submission error:", error);

                alert(
                    "Unable to submit enquiry. Please try again."
                );

            } finally {

                if (submitButton) {

                    submitButton.disabled = false;

                    if (submitButton.tagName === "INPUT") {
                        submitButton.value = "Send Enquiry";
                    } else {
                        submitButton.innerText = "Send Enquiry";
                    }

                }

            }

        });

    });


    // ===============================
    // BOOK NOW FORM
    // ===============================

    const bookingForm = document.getElementById("bookingForm");

    if (bookingForm) {

        bookingForm.addEventListener("submit", async function (event) {

            event.preventDefault();

            const submitButton = bookingForm.querySelector(
                'button[type="submit"], input[type="submit"]'
            );

            if (submitButton) {
                submitButton.disabled = true;

                if (submitButton.tagName === "INPUT") {
                    submitButton.value = "Submitting...";
                } else {
                    submitButton.innerText = "Submitting...";
                }
            }

            const data = {
                type: "booking",

                name:
                    document.getElementById("bookingName")?.value || "",

                email:
                    document.getElementById("bookingEmail")?.value || "",

                phone:
                    document.getElementById("bookingPhone")?.value || "",

                date:
                    document.getElementById("bookingDate")?.value || "",

                travellers:
                    document.getElementById("bookingTravellers")?.value || "",

                message:
                    document.getElementById("bookingMessage")?.value || ""
            };

            console.log("Sending booking:", data);

            try {

                const response = await fetch("https://gojawai-backend-o0i1gwqwc-anshika19.vercel.app/api/enquiries", {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(data)
                    }
                );

                const result = await response.json();

                console.log("Booking response:", result);

                if (!response.ok) {
                    throw new Error(
                        result.message || "Booking failed"
                    );
                }

                alert(
                    "Your booking enquiry has been submitted successfully!"
                );

                bookingForm.reset();

                const popup = document.getElementById("popup");

                if (popup) {
                    popup.classList.remove("active");
                }

            } catch (error) {

                console.error("Booking error:", error);

                alert(
                    "Unable to submit booking. Please try again."
                );

            } finally {

                if (submitButton) {
                    submitButton.disabled = false;

                    if (submitButton.tagName === "INPUT") {
                        submitButton.value = "Submit Booking";
                    } else {
                        submitButton.innerText = "Submit Booking";
                    }
                }

            }

        });

    }

});