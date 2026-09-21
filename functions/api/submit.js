export async function onRequestPost(context) {
    try {
        const formData = await context.request.formData();

        const name = formData.get("name");
        const email = formData.get("email");
        const course = formData.get("course");
        const message = formData.get("message");

        if (!name || !email || !message) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "Faltan datos obligatorios."
                }),
                {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        const resendResponse = await fetch(
            "https://api.resend.com/emails",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${context.env.RESEND_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    from: "onboarding@resend.dev",
                    to: ["Bar.k.p@hotmail.com"],
                    reply_to: email,
                    subject: `Nueva consulta de ${name}`,
                    html: `
                        <h2>Nueva consulta desde la web</h2>

                        <p><strong>Nombre:</strong> ${name}</p>

                        <p><strong>Email:</strong> ${email}</p>

                        <p><strong>Curso:</strong> ${course || "No especificado"}</p>

                        <hr>

                        <p><strong>Mensaje:</strong></p>

                        <p>${message}</p>
                    `
                })
            }
        );

        const result = await resendResponse.json();

        if (!resendResponse.ok) {
            console.error("Resend error:", result);

            return new Response(
                JSON.stringify({
                    success: false,
                    error: "No se pudo enviar el email."
                }),
                {
                    status: 500,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        return new Response(
            JSON.stringify({
                success: true
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

    } catch (error) {

        console.error("Function error:", error);

        return new Response(
            JSON.stringify({
                success: false,
                error: "Ocurrió un error al procesar la consulta."
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }
}