import React from "react";

function UserStatistics(props) {
  return (
    <ul>
      <li>{`Logged in as: ${props.userStatus.user.userInfo.username}`}</li>
      <li>{`Games played: ${props.userStatus.userStatistics.games_played}`}</li>
      <li>{`Games won: ${props.userStatus.userStatistics.games_won}`}</li>
      <li>{`Lowest time win: ${
        props.userStatus.userStatistics.lowest_time_win
      }`}</li>
    </ul>
  );
}

export default UserStatistics;
