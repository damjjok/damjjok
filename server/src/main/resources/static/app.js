var stompClient = null;
var userName = ""; // 사용자 이름 저장 변수

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        var name = $("#name").val(); // 연결 시 사용자 이름 설정
        // 사용자 이름을 서버에 등록
        stompClient.send("/app/register", {}, JSON.stringify({ 'name': name }));
        // 사용자가 /topic/greetings 구독
        stompClient.subscribe('/topic/greetings', function (greeting) {
            showGreeting(JSON.parse(greeting.body).content);
        });
        stompClient.subscribe('/topic/voteStart', function (voteStart) {
                    displayVoteSection(voteStart.body);
        });
        stompClient.subscribe('/topic/voteResults', function (message) {
            var results = JSON.parse(message.body);
            displayVoteResults(results);
        });
    });
}


function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    var messageContent = $("#message").val();
    if(messageContent && stompClient) {
        stompClient.send("/app/hello", {}, JSON.stringify({'name': userName, 'content': messageContent}));
        $("#message").val("");
    }
}



function displayVoteSection(message) {
    $("#voteMessage").text(message);
    $("#voteSection").show();
}

function vote(choice) {
    if (stompClient) {
        stompClient.send("/app/vote", {}, JSON.stringify({'choice': choice}));
        // 투표 후 투표 옵션 비활성화
        $("button").prop('disabled', true); // 모든 버튼을 비활성화, 필요에 따라 조정
    }
}


function startVote() {
    if (stompClient) {
        stompClient.send("/app/vote/start", {}, JSON.stringify({}));
        // 투표 시작 후 버튼 비활성화
        $("#startVoteBtn").prop('disabled', true);
    }
}

function displayVoteResults(results) {
    console.log("투표 결과:", results);
    // 투표 결과를 페이지에 표시하는 예시 코드
    // 예를 들어, 결과를 'voteResults'라는 ID를 가진 요소에 표시
    var resultsText = "투표 결과: <br>";
    Object.keys(results).forEach(function(key) {
        resultsText += "선택 " + key + ": " + results[key] + "표<br>";
    });
    $("#voteResults").html(resultsText);
}


function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
});