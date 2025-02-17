import PageLayout from "../components/PageLayout";

const HowToPlay = () => {
  return (
    <PageLayout>
      <div className="text-center">
        <h2 className="text-3xl font-bold my-6">진행 방법</h2>
        <p className="text-gray-700">
          ‘2025 퍼플 동박 미궁’은 미궁 게임으로, 주어진 문제들을 풀어서 미궁의 끝에 도달하는 것이 목표인 게임입니다.<br />
          미궁 게임은 매 페이지에 문제가 주어지고, 문제의 답을 입력하면 다음 페이지로 넘어가는 방식으로 진행됩니다.<br />
          각 페이지는 스토리 혹은 문제를 포함하고 있습니다.
        </p>
        <br />
        <p className="text-gray-700">
          대부분의 문제에는 정답 형식이 명시되어 있습니다. 예를 들어,<br />
          <strong>[Answer Type: English]</strong> 인 경우, 정답을 띄어쓰기 없이 영어 소문자로만 입력하시면 됩니다.<br />
          <strong>[Answer Type: Korean]</strong> 인 경우, 정답을 띄어쓰기 없이 한글로만 입력하시면 됩니다.<br />
          <strong>[Answer Type: Number]</strong> 인 경우, 정답을 띄어쓰기 없이 숫자로만 입력하시면 됩니다.<br />
          해당되지 않는 문제의 경우 명시되어 있는 정답 형식을 참고하시면 됩니다.<br />
          일부 문제의 경우 정답 형식이 명시되어 있지 않습니다.
        </p>
        <br />
        <p className="text-gray-700">
          본 미궁은 로그인 후에 이용이 가능합니다.<br />
          만약 본 미궁이 처음이시라면 <strong>Login</strong> 탭을 통해서 회원가입을 하실 수 있습니다.<br />
          로그인 이후에는 <strong>History</strong> 탭을 통해 현재까지 푼 모든 문제에 접근하실 수 있습니다.
        </p>
        <br />
        <h3 className="text-2xl font-semibold mt-6">미궁 진행 방법 요약</h3>
        <p className="text-gray-700">
          <br />
          1. 문제를 읽고 답을 입력하세요.<br />
          2. 정답을 맞히면 다음 문제로 이동합니다.<br />
          3. 모든 문제를 풀면 명예의 전당에 등록됩니다.<br />
          4. 행운을 빕니다!
        </p>
      </div>
    </PageLayout>
  );
};

export default HowToPlay;
