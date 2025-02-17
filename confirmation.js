document.addEventListener("DOMContentLoaded", function () {

    const urlParams = new URLSearchParams(window.location.search);
    const firstName = urlParams.get("firstName") || "N/A";
    const lastName = urlParams.get("lastName") || "N/A";
    const servicesRaw = urlParams.get("services") || "N/A";
    const dateRaw = urlParams.get("date") || "N/A";
    const times = urlParams.get("times") || "N/A";
    const streetNumber = urlParams.get("streetNumber") || "N/A";
    const streetName = urlParams.get("streetName") || "N/A";
    const email = urlParams.get("email") || "N/A";

    function formatDate(isoDate) {
        if (!isoDate || isoDate === "N/A") return "N/A";
        const dateObj = new Date(isoDate);
        return dateObj.toLocaleDateString("en-US", { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }
    const formattedDate = formatDate(dateRaw);

    function formatServices(servicesString) {
        if (!servicesString || servicesString === "N/A") return "N/A";
        const services = servicesString.split(", ");

        if (services.length === 1) {
            return services[0];
        } else if (services.length === 2) {
            return `${services[0]} and ${services[1]}`;
        } else {
            return `${services.slice(0, -1).join(", ")}, and ${services[services.length - 1]}`;
        }
    }
    const formattedServices = formatServices(servicesRaw);

    const message = `
        You, ${firstName} ${lastName}, have booked ${formattedServices} services for ${formattedDate} for the ${times} 
        at the address ${streetNumber} ${streetName}. A confirmation email with all the details has 
        been sent to ${email}. The fee will be calculated after the job. 
        
        If you have any questions or need to cancel or reschedule, please send an email to 
        <a href="mailto:bob@helpinghand.ca">bob@helpinghand.ca</a>.<br><br>
        
        Looking forward to seeing you!
    `;

    document.getElementById("confirmation-message").innerHTML = message;
});
