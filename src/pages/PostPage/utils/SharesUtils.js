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
export const shareKakao = () => {
  if (window.Kakao) {
    const kakao = window.Kakao;
    // if (!kakao.isInitialized()) kakao.init(precess.env.REACT_APP_KAKAO_API_KEY);

    window.Kakao.Link.sendCustom({
      templatedId: 105094,
    });
  }
};
