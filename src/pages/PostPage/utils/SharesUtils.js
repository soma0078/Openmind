const url = 'https://deploy-preview-33--openyourmind.netlify.app';

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
        'https://cdn.univ20.com/wp-content/uploads/2019/02/36bf2af760e78ec44d02283e72e86b30.png',
      link: {
        mobileWebUrl: 'https://developers.kakao.com',
        webUrl: 'https://developers.kakao.com',
      },
    },
    buttons: [
      {
        title: '나도 질문하러 가기',
        link: {
          mobileWebUrl: 'https://developers.kakao.com',
        },
      },
    ],
  });
};
