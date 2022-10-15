import React, { useState, useEffect, useRef } from "react";
import "./print_style.css";
import logo from "../../../../assets/images/logo-blue.png"
export class ResubmitFinalTestPasswordsPrint extends React.PureComponent {
  render() {
    const { data, access_group } = this.props;
    return (
      <div className="p-5">
        <div className="  ">
          {data?.map((element, index) => {
            return (
              <div className=" password-card"> 
                <div className="password-card-part part1 "><img src={logo} alt="" /></div>
                <div className="password-card-part part2 ">
                  <div>F.I.O:{element?.student_fio}</div>
                  <div>Tashkilot:{access_group?.organization?.name_uz}</div>
                  <div>Guruh:{access_group?.name}</div>
                  <div>login:{element?.username}</div>
                  <div>parol:{element?.password}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
