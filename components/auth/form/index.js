import { useState, useEffect, useRef, useContext, createContext } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import Logo from "components/svg/ui";
import Style from "styles/auth/index.module.scss";
const AUTH = gql`
  query($code: String!) {
    auth(code: $code)
  }
`;

const QueryInfo = createContext();

export default function AuthForm() {
  const [authme, { data, loading }] = useLazyQuery(AUTH);
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState(undefined);
  const authHandl = e => {
    e.preventDefault();
    if (!code) return setMsg("رجاءا ادخل الرمز");

    if (!loading || (data && !data.auth)) authme({ variables: { code } });
  };
  useEffect(() => {
    if (data) {
      if (data.auth) {
        setMsg(undefined);
        document.cookie = `uid=${data.auth}`;
        location = "/app";
      } else setMsg("الكود خاطئ !");
    }
  }, [data]);

  return (
    <form onSubmit={authHandl}>
      <QueryInfo.Provider value={{ loading, data }}>
        <Title msg={msg} />
        <Input setMsg={setMsg} code={code} setCode={setCode} />
        <Button />
      </QueryInfo.Provider>
    </form>
  );
}
function Title({ msg }) {
  return (
    <>
      <Logo />
      <p
        className={msg ? "ar" : "en"}
        style={{
          color: msg ? "#ff2a37" : "#bdbdbd"
        }}
      >
        {msg || "bibop bibap"}
      </p>
    </>
  );
}

function Input({ code, setCode, setMsg }) {
  const inputRef = useRef();
  const [isFocus, setIsFocus] = useState(false);
  const focusMe = () => {
    const { current } = inputRef;
    setIsFocus(current === document.activeElement);
  };
  useEffect(() => {
    document.addEventListener("click", focusMe);
    return () => {
      document.addEventListener("click", focusMe);
    };
  }, []);

  const changeme = e => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9_]+$/i.test(value) === true || !value) setCode(value);
    setMsg(undefined);
  };

  return (
    <input
      className={isFocus ? Style.focus : "none"}
      value={code}
      ref={inputRef}
      onChange={changeme}
      type="text"
      placeholder="XXX-XXX-XXX"
    />
  );
}

function Button() {
  const { loading, data } = useContext(QueryInfo);

  const [type, setType] = useState("submit");

  useEffect(() => {
    if (loading) return setType("button");
    if (data) {
      if (data.auth) return setType("button");
      else return setType("submit");
    }
  }, [data]);
  return (
    <button type={type}>
      {loading
        ? "جاري التحقق..."
        : data && data.auth
        ? "مرحبا بك ^_^"
        : "ادخل الكود"}
    </button>
  );
}
