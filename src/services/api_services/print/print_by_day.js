export const printReportByDay = async (dataPrint,statusPrint) => {
    var mywindow = window.open('', 'PRINT', 'height=800,width=1000');

    mywindow.document.write('<html><head><title>' + document.title + '</title>');
    mywindow.document.write('<style>' +
        '@media print{ @page { size: 10;margin:0}} body{font-size: 11px !important;}' +
        '</style>');
    mywindow.document.write('</head><body >');
    mywindow.document.write(`<div style="padding: 0;margin: 0"  >
salom

</div>`)
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
}