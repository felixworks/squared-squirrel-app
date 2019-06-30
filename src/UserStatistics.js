import React from "react";

function UserStatistics(props) {
  return (
    <section className="user-statistics-container">
      <ul className="user-statistics-list">
        <li>{`Logged in as: ${props.userStatus.user.userInfo.username}`}</li>
        <li>{`Games played: ${
          props.userStatus.userStatistics.games_played
        }`}</li>
        <li>{`Games won: ${props.userStatus.userStatistics.games_won}`}</li>
        {/* <li>{`Lowest time win: ${
      props.userStatus.userStatistics.lowest_time_win
    }`}</li> */}
      </ul>
    </section>
  );
}

export default UserStatistics;
