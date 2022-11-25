import React from "react";

const ShowQueueNumber = props => {
  const { data } = props;
  return (
    <div>
      {data
        ? data?.map((element, index) => {
            return (
              <div
                className={"d-flex justify-content-center align-items-center"}
              >
                <p
                  style={{
                    backgroundColor: props?.backgroundColor,
                    fontSize: "80px",
                    color: "#fff",
                    padding: "10px",
                    borderRadius: "1px",
                  }}
                >
                  {element?.unikal_number}
                </p>
              </div>
            );
          })
        : ""}
    </div>
  );
};

export default ShowQueueNumber;
