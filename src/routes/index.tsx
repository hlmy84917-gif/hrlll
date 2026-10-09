import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowRight, BrainCircuit, ChartNoAxesColumnIncreasing, Check, ChevronDown, Eye, EyeOff, FileText, Globe, LockKeyhole, ShieldCheck, ShieldHalf, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/ainids-logo.png";
import background from "@/assets/network-background.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "AI-NIDS | تسجيل الدخول الآمن" },
    { name: "description", content: "تسجيل الدخول إلى نظام كشف تسلل الشبكة بالذكاء الاصطناعي AI-NIDS." },
    { property: "og:title", content: "AI-NIDS | تسجيل الدخول الآمن" },
    { property: "og:description", content: "نظام كشف تسلل الشبكة بالذكاء الاصطناعي — مراقبة ذكية وشبكات أكثر أمانًا." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

function Index() {
  const [english, setEnglish] = useState(false);
  const [visible, setVisible] = useState(false);
  const [remember, setRemember] = useState(true);
  const [recovery, setRecovery] = useState(false);
  const [notice, setNotice] = useState("");
  const t = (ar: string, en: string) => english ? en : ar;
  const features = [
    { icon: BrainCircuit, title: t("تحليل بالذكاء الاصطناعي", "AI-powered analysis"), copy: t("اكتشاف التهديدات\nبدقة عالية", "Detect threats with\nhigh accuracy") },
    { icon: ChartNoAxesColumnIncreasing, title: t("مراقبة حركة الشبكة", "Network monitoring"), copy: t("تحليل لحظي\nللتدفقات والحزم", "Real-time traffic\nand packet analysis") },
    { icon: ShieldHalf, title: t("تنبيهات ذكية", "Smart alerts"), copy: t("تنبيه فوري\nمع تفسير القرار", "Instant alerts with\nclear explanations") },
    { icon: FileText, title: t("تقارير شاملة", "Detailed reports"), copy: t("سجلات وتحليلات\nمفصلة", "Detailed logs\nand insights") },
  ];
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(t("خدمة تسجيل الدخول غير متصلة بعد.", "The sign-in service is not connected yet."));
  }
  return (
    <div className="login-page">
      <img className="network-background" src={background.url} alt="" />
      <header className="page-header">
        <div className="header-motto" dir="rtl">{t("شبكة أكثر أمانًا", "Safer networks")}<br />{t("لعالم أكثر استقرارًا", "A more secure world")}<span /></div>
        <span className="version" dir="rtl">{t("النسخة", "Version")} 1.0.0</span>
      </header>
      <main className="login-layout">
        <section className="brand-section">
          <div className="brand-lockup">
            <img className="brand-logo" src={logo} alt="شعار AI-NIDS" />
            <div className="brand-name"><h1><span>AI</span>-NIDS</h1><p>AI-POWERED NETWORK<br />INTRUSION DETECTION SYSTEM</p></div>
          </div>
          <div className="brand-description" dir={english ? "ltr" : "rtl"}>
            <h2>{t("نظام كشف تسلل الشبكة بالذكاء الاصطناعي", "AI-powered network intrusion detection")}</h2>
            <p>{t("مراقبة ذكية", "Smart monitoring")}<b>•</b>{t("تحليل متقدم", "Advanced analysis")}<b>•</b>{t("شبكات أكثر أمانًا", "Safer networks")}</p>
            <span className="section-accent" />
          </div>
          <div className="feature-grid">
            {features.map(({icon: Icon, title, copy}) => <article className="feature-item" key={title} dir={english ? "ltr" : "rtl"}><Icon strokeWidth={1.7} /><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </section>
        <section className="login-panel" dir={english ? "ltr" : "rtl"} aria-label={t("تسجيل الدخول", "Sign in")}>
          <div className="language-row"><Button variant="outline" className="language-button" onClick={() => { setEnglish(!english); setNotice(""); }}><Globe /><span>{english ? "English" : "العربية"}</span><ChevronDown /></Button></div>
          <div className="welcome"><h2>{recovery ? t("نسيت كلمة المرور؟", "Forgot your password?") : t("مرحبًا بك مجددًا", "Welcome back")}</h2><p>{recovery ? t("أدخل اسم المستخدم لاستعادة الوصول", "Enter your username to recover access") : t("قم بتسجيل الدخول للوصول إلى نظام AI-NIDS", "Sign in to access AI-NIDS")}</p></div>
          <form onSubmit={submit} className="login-form">
            <div className="field"><Input aria-label={t("اسم المستخدم", "Username")} placeholder={t("اسم المستخدم", "Username")} autoComplete="username" required /><UserRound className="field-icon" /></div>
            {!recovery && <><div className="field"><Input aria-label={t("كلمة المرور", "Password")} placeholder={t("كلمة المرور", "Password")} type={visible ? "text" : "password"} autoComplete="current-password" required /><LockKeyhole className="field-icon" /><Button variant="ghost" size="icon" type="button" className="password-toggle" aria-label={visible ? t("إخفاء كلمة المرور", "Hide password") : t("إظهار كلمة المرور", "Show password")} onClick={() => setVisible(!visible)}>{visible ? <Eye /> : <EyeOff />}</Button></div>
            <div className="form-options"><label className="remember-label"><input type="checkbox" checked={remember} onChange={event => setRemember(event.target.checked)} /><span className="check-box">{remember && <Check />}</span>{t("تذكرني", "Remember me")}</label><Button variant="link" type="button" onClick={() => { setRecovery(true); setNotice(""); }}>{t("نسيت كلمة المرور؟", "Forgot password?")}</Button></div></>}
            <Button className="sign-in-button" type="submit"><ArrowRight /><span>{recovery ? t("استعادة الوصول", "Recover access") : t("تسجيل الدخول", "Sign in")}</span></Button>
            {recovery && <Button variant="link" className="back-button" type="button" onClick={() => { setRecovery(false); setNotice(""); }}>{t("العودة إلى تسجيل الدخول", "Back to sign in")}</Button>}
            {notice && <p className="form-notice" role="status">{notice}</p>}
          </form>
          <div className="security-note"><ShieldCheck /><p>{t("حماية شبكتك.. تبدأ من هنا", "Your network protection starts here")}<span>AI-NIDS</span></p></div>
        </section>
      </main>
      <footer className="page-footer">AI-NIDS <span>|</span> Secure Networks, Smart Tomorrow</footer>
    </div>
  );
}
