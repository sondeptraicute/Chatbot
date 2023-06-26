$(function() {
    var inputVal;
    let API_Key = "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";

    function renderMesGPT(incoming) {
        let API_URL = "https://api.openai.com/v1/chat/completions";
        let chatbox = document.querySelector(".chatbox")
        let contentBot = incoming.querySelector(".loading");
        const option = {
            method: "POST",
            headers: {
                Accept: "application.json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_Key}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ "role": "user", "content": inputVal }]
            })
        }
        fetch(API_URL, option).then(res => res.json()).then(data => {
            contentBot.innerHTML = data.choices[0].message.content;
        }).catch((error) => {
            contentBot.innerHTML = "Error"
        }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
    }

    function createMessage(message, className) {
        let chatbox = document.querySelector(".chatbox");
        const chatLi = document.createElement("div");
        chatLi.classList.add("chat", className)
        let contentUser = className === "outcoming" ? `<p class="text"></p>` : `<div class="icon-robot"><i class="fa-solid fa-robot"></i></div><div class='loading'><div class="box-loader"><div class="circle circle1"></div><div class="circle circle2"></div><div class="circle circle3"></div></div></div><p></p>`;
        chatLi.innerHTML = contentUser;
        console.log(chatLi.querySelector(".text"));
        chatLi.querySelector("p").innerText = message
        chatbox.scrollTo(0, chatbox.scrollHeight);
        return chatLi;
    }
    $(".send").on("click", function() {
        inputVal = $(".message input").val().trim();
        if (!inputVal) return;
        $(".message input").val("");
        let chatbox = document.querySelector(".chatbox");
        $(".chatbox").append(createMessage(inputVal, "outcoming"));
        setTimeout(() => {
            let incomingText = createMessage("", "incoming");
            $('.chatbox').append(incomingText);
            renderMesGPT(incomingText);
        }, 500);
        chatbox.scrollTo(0, chatbox.scrollHeight)
    })
    $(".message input").on("keydown", function(event) {
        if (event.keyCode === 13) { // Kiểm tra nếu phím nhấn là Enter (mã phím 13)
            inputVal = $(this).val().trim();
            if (!inputVal) return;
            $(this).val("");
            let chatbox = document.querySelector(".chatbox");
            $(".chatbox").append(createMessage(inputVal, "outcoming"));
            setTimeout(() => {
                let incomingText = createMessage("", "incoming");
                $('.chatbox').append(incomingText);
                renderMesGPT(incomingText);
            }, 500);
            chatbox.scrollTo(0, chatbox.scrollHeight);
        }
    });
    // Ngăn chặn click chuột phải
    document.addEventListener("contextmenu", function(e) {
        e.preventDefault();
    });

    // Ngăn chặn sử dụng phím F12
    document.addEventListener("keydown", function(e) {
        if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
            e.preventDefault();
        }
    });

    $("button[type='button']").on("click", function() {
        $('.boxchatbot').fadeIn("slow");
        $('.home').fadeOut("slow")
    })
    $(".fa-xmark").on("click", function() {
        $('.boxchatbot').fadeOut("slow");
        $('.home').fadeIn("slow")
    })

    gsap.from(".home", {
        duration: 4,
        opacity: 0,
        ease: "power4.easeOut",
    })
})
