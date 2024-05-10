const url = window.location.href;

// Facebook
export const shareFacebook = () => {
  window.open(
    'http://www.facebook.com/sharer/sharer.php?u=' + url,
    'popup',
    'width=560, height=560, top=150, right=100. scrollbars=yes',
  );
};

//Kakao
const { Kakao } = window;

export const shareKakao = () => {
  Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: 'Openmind',
      description: '#Openmind #질문 #소통 #무물보',
      imageUrl:
        'http://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
      link: {
        mobileWebUrl: 'https://developers.kakao.com',
        webUrl: 'https://developers.kakao.com',
      },
    },
    //    social: {
    //       likeCount: 6,
    //       commnetCount: 74,
    //       sharedCount: 921,
    buttons: [
      {
        title: '나도 테스트 하러가기',
        link: {
          mobileWebUrl: 'https://developers.kakao.com',
        },
      },
    ],
  });
};

// }
// export const shareKakao = (url) => {
//   if (!window.Kakao.isInitialized()) {
//     const key = process.env.REACT_APP_JAVASCRIPT_KEY;
//     window.Kakao.init(key);
//   }

//   window.Kakao.Share.sendDefault({
//     objectType: 'feed',
//     content: {
//       title: 'Openmind',
//       description: '#Openmind #질문 #소통 #무물보',
//       imageUrl:
//         'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbE0AdB%2FbtsDW9qmIRy%2FMrUAV7zrpnKKgAHPbzkOd1%2Fimg.png',
//       link: {
//         mobileWebUrl: url,
//         webUrl: url,
//       },
//     },
//     social: {
//       likeCount: 6,
//       commnetCount: 74,
//       sharedCount: 921,
//     },
//   });
// };
