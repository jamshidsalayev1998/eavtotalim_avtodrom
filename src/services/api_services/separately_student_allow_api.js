import axios from "axios";
import API from "../../api";

export const showSeparatelyStudentAllow = async elementId => {
  try {
    const token = localStorage.getItem("token");
    const response = await API({
      url: `/come-examination/separately-students-allow/${elementId}`,
      method: "GET",
      params: {
        token: token,
      },
    });
    if (response?.data) {
      const data = response;
      return data;
    }
  } catch (error) {}
};

export const printToCheckSeparatelyStudentAllow = async dataPrint => {
  var mywindow = window.open("", "PRINT", "height=800,width=1000");

  mywindow.document.write("<html><head><title>" + document.title + "</title>");
  mywindow.document.write(
    "<style>" +
      "@media print{ @page { size: 10;margin:0}} body{font-size: 11px !important;}" +
      "</style>"
  );
  mywindow.document.write("</head><body >");
  mywindow.document.write(`<div style="padding: 0;margin: 0"  >
${
  dataPrint?.computer?.order ? (
    <div>
      <h1 className={"w-100 text-center"}>${dataPrint?.computer?.order}</h1>
      <p className={"w-100 text-center"}>kompyuter raqami</p>
    </div>
  ) : (
    ""
  )
}
        
                    <div style="text-align: center">
                    <p >Familiya ism otasining ismi: </p>
</div>
<div style="text-align: center">
<b>
 ${dataPrint?.final_test_student?.student_fio}
 </b>
</div>
<div style="text-align: center; border: 1px solid black">
<b>
Login: ${dataPrint?.user?.username}
 </b>
</div>
<div style="text-align: center; border: 1px solid black">
<b>
 Parol: ${dataPrint?.user?.password}
 </b>
</div>
                </div>
                <div>
                    </div>`);
  mywindow.document.write("</body></html>");

  mywindow.document.close(); // necessary for IE >= 10
  mywindow.focus(); // necessary for IE >= 10*/

  mywindow.print();
  mywindow.close();

  return true;
};
