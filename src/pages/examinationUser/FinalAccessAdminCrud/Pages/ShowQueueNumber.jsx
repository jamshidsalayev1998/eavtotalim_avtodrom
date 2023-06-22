import React from "react";

const ShowQueueNumber = props => {
  const { data } = props;
  return (
    <div>
      {data
        ? data?.map((element, index) => {
            return (
              <>
                {/* <div
                  className={"d-flex justify-content-center align-items-center"}
                >
                  <p
                    style={{
                      backgroundColor: props?.backgroundColor,
                      fontSize: "100px",
                      color: "#fff",
                      padding: "10px",
                      borderRadius: "1px",
                    }}
                  >
                    {element?.unikal_number}
                  </p>
                </div> */}

                <div
                  className="p-2 rounded rounded-5 large-queue-element"
                  style={{ backgroundColor: props?.backgroundColor }}
                >
                  <p
                    style={{
                      // backgroundColor: props?.backgroundColor,
                      fontSize: "100px",
                      color: "#fff",
                      borderRadius: "1px",
                      marginBottom: 0,
                    }}
                  >
                    {element?.unikal_number}
                  </p>
                  <span
                    style={{
                      // backgroundColor: props?.backgroundColor,
                      color: "#fff",
                    }}
                  >
                    {element?.student_fio}
                  </span>
                </div>
              </>
            );
          })
        : ""}
    </div>
  );
};

export default ShowQueueNumber;
