function getPost() {
    if (document.getElementById("postArea").value != "") {
        var param = new URLSearchParams();
        var str = document.getElementById("postArea").value;
        console.log(str);
        param.append("action", "postAPost");
        param.append("user_id", localStorage.getItem("user_id"));
        param.append("uid", localStorage.getItem("uid"));
        param.append("post", str.trim());
        return param;
    }
    else {
        return null;
    }
}
//# sourceMappingURL=post.js.map