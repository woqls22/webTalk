import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
const KaKaoWebTalk = () => {
  const [loginState, setLoginState] = useState("Not Logged In");
  const [userInfo, setUserInfo] = useState(null);
  const [friends, setFriends] = useState(null);
  const [text,setText]=useState("");
  const [sendHistory, setSendHistory]=useState([]);
  useEffect(() => {
    window.Kakao.init("****");
    console.log(window.Kakao.isInitialized());
  }, []);
  const fetchFriendList = () => {
    window.Kakao.API.request({
      url: "/v1/api/talk/friends",
      success: function (response) {
        console.log(response);
        setFriends(response);
      },
      fail: function (error) {
        console.log(error);
      },
    });
  };
  
  const loginWithOtherAccount=()=>{
    window.Kakao.Auth.authorize({
      redirectUri: 'http://localhost:3000/oauth',
      prompts: 'login'
    })
  }
  const fetchChatList = () => {};
  const logIn = () => {
    window.Kakao.Auth.login({
      success: (authObj) => {
        setLoginState("Logged In");
        window.Kakao.Auth.setAccessToken(authObj.access_token);
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: (res) => {
            console.log(res);
            setUserInfo(res);
          },
          fail: function (error) {
            console.log(error);
          },
        });
      },
      fail: function (error) {
        console.log(error);
      },
    });
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(text.length>0){
      sendLink(""); // url to blank
    }
  }
  const sendLink = (imageUrl) => {
    var url = "https://myanimals.com/ko/training/how-to-tame-a-guinea-pig-tips-and-tricks/";
    if (imageUrl.length > 0) {
      url = imageUrl;
    }
    window.Kakao.Link.sendDefault({
      objectType: "text",
      text:text,
      link: {
          webUrl: url,
          mobileWebUrl: url,
        }
    });
    let history = [...sendHistory,"내용 :  [ "+text+" ]"+"  Send Request At"+new Date().toLocaleTimeString()]
    setSendHistory(history);
    setText("");
  };
  const logOut = () => {
    if (!window.Kakao.Auth.getAccessToken()) {
      console.log("Not logged in.");
      return;
    }
    window.Kakao.Auth.logout(function () {
      console.log(window.Kakao.Auth.getAccessToken());
      window.location.reload(true);
    });
    // window.Kakao.API.request({
    //   url: "/v1/user/unlink",
    //   success: function (response) {
    //     console.log(response);
    //     window.location.reload(true);
    //   },
    //   fail: function (error) {
    //     console.log(error);
    //   },
    // });
    setLoginState("Not Logged In");
  };
  return (
    <div>
      <div style={{ paddingTop: "1rem", marginLeft: "1rem" }}>
        <Button
          onClick={logIn}
          disabled={loginState == "Logged In" && userInfo != null}
        >
          로그인
        </Button>
        <Button onClick={logOut}>로그아웃</Button>
        <Button onClick={loginWithOtherAccount}>다른계정으로 로그인</Button>
        <Button onClick={fetchFriendList}>친구목록불러오기</Button>
        {/* <div style={{ textAlign: "right", marginRight: "1rem" }}>
          로그인 상태 : {loginState}
        </div> */}
      </div>
      <div
        style={{
          border: "1px solid #000000",
          height: "5rem",
          width: "30%",
          marginLeft: "1rem",
        }}
      >
        {userInfo ? (
          <>
            <div style={{ display: "flex" }}>
              <div style={{ width: "auto", height: "5rem" }}>
                <img
                  src={userInfo.properties.thumbnail_image}
                  style={{ height: "100%" }}
                />
              </div>
              <div style={{ marginLeft: "1rem" }}>
                LogIn Info : {userInfo.properties.nickname}
                <br />
                Email :{" "}
                {userInfo.kakao_account.email
                  ? userInfo.kakao_account.email
                  : "이메일정보 없음"}
                <br />
                BirthDay:
                {userInfo.kakao_account.birthday
                  ? userInfo.kakao_account.birthday
                  : "생일정보 없음"}
              </div>
            </div>
          </>
        ) : (
          <>Not Logged In</>
        )}

        <br />
      </div>
      <div style={{ display: "flex", paddingTop: "1rem", marginLeft: "1rem" }}>
        <div style={{ width: "25%", height: "40rem" }}>
          Friends List
          <div
            style={{
              minHeight: "40rem",
              border: "1px solid #000000",
              marginRight: "2rem",
            }}
          >
            {friends != null ? (
              <>
                {friends.elements.map((item) => {
                  return <>{item.profile_nickname}</>;
                })}
              </>
            ) : (
              <>Can't fetch Friends!</>
            )}
          </div>
        </div>
        <div style={{ width: "25%", height: "40rem" }}>
          Chat List
          <div
            style={{
              minHeight: "40rem",
              border: "1px solid #000000",
              marginRight: "2rem",
            }}
          ></div>
        </div>
        <div style={{ width: "50%", height: "40rem" }}>
          Chat Room
          <div
            style={{
              minHeight: "40rem",
              border: "1px solid #000000",
              marginRight: "2rem",
            }}
          >
            <div style={{
                marginTop:"1rem",
                minHeight: "25rem",
                border: "1px solid #000000",
                marginRight: "1rem",
                marginLeft: "1rem"
              }}>
            {sendHistory.map((item)=>{
              return(<div>{item}</div>)
            })}
            </div>
            <div
              style={{
                marginTop:"1.5rem",
                minHeight: "10rem",
                marginRight: "1rem",
                marginLeft: "1rem"
              }}
            >
            <TextField
            label="메시지"
            placeholder="여기에 카톡 내용을 써 주세요"
            fullWidth
            autoFocus
            multiline
            rows="5"
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div style={{float:"right"}}>
       <Button
          variant="outlined"
          color="primary"
          id="kakao-link-btn"
          onClick={(e) => handleSubmit(e)}
        >
          카톡 전송
        </Button>
      </div>
       
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KaKaoWebTalk;
