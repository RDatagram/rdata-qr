/**
 * @NApiVersion 2.1
 */
define(['N/https'],
    /**
 * @param https
 */
    (https) => {

        const generateQR = (payload) => {

            const header = {
                'Content-Type': 'application/json'
            };

            const response = https.post({
                url: 'https://nbs.rs/QRcode/api/qr/v1/gen',
                headers: header,
                body: JSON.stringify(payload)
            });

            log.debug({
                title: 'NBS Response',
                details: response
            })

            return response.body;
        }

        return {generateQR: generateQR}

    });
