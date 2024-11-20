/**
 * @NApiVersion 2.1
 * @NScriptType WorkflowActionScript
 */
define(['N/file','./rdata-nbs-lib'],
    /**
 * @param fileModule
     * @param rdata_nbs_lib
 */
    (fileModule, rdata_nbs_lib) => {
        /**
         * Defines the WorkflowAction script trigger point.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.workflowId - Internal ID of workflow which triggered this action
         * @param {string} scriptContext.type - Event type
         * @param {Form} scriptContext.form - Current form that the script uses to interact with the record
         * @since 2016.1
         */
        const onAction = (scriptContext) => {

            const invoice = scriptContext.newRecord;

            const amount = scriptContext.newRecord.getValue('total');

            let payload = {
                "K": "PR",
                "V": "01",
                "C": "1",
                "R": "845000000040484987",
                "N": "JP EPS BEOGRAD\r\nBALKANSKA 13",
                "I": "RSD"+ amount.toLocaleString('sr-SR').replace('.',''),
                "SF": "189",
                "S": "UPLATA PO RAČUNU"
            }

            log.debug({
                title: 'Invoice Payload',
                details: payload
            });

            let pngFile = rdata_nbs_lib.generateQR(payload);

            log.debug({
                title: 'Generate QR Code',
                details: pngFile,
            });

            let myFile = fileModule.create({
                name: 'response.png',
                fileType: fileModule.Type.PNGIMAGE,
                contents: pngFile,
                encoding: fileModule.Encoding.BASE64,
                folder: 425 // replace with your folder path or ID
            });

            const idQRCode = myFile.save();

            invoice.setValue({
                fieldId: 'custbody_invoice_qr_code',
                value: idQRCode
            })
        }

        return {onAction};
    });
