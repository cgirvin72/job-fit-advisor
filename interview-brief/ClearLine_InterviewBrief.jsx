import { useState, useRef } from "react";

const BRAND = {
  navy: "#003B5C",
  blue: "#005B96",
  lightBlue: "#00A6D6",
  white: "#FFFFFF",
  offWhite: "#F4F8FC",
  slate: "#E8EFF6",
  text: "#1A2B3C",
  muted: "#5A7185",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body { background: ${BRAND.offWhite}; font-family: 'DM Sans', sans-serif; color: ${BRAND.text}; }

  .app { min-height: 100vh; background: linear-gradient(160deg, #F4F8FC 0%, #E8F1FA 50%, #DCE9F5 100%); }

  .header {
    background: ${BRAND.navy};
    padding: 28px 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 3px solid ${BRAND.lightBlue};
  }
  .header-logo {
    font-family: 'Playfair Display', serif;
    color: ${BRAND.white};
    font-size: 22px;
    letter-spacing: -0.3px;
  }
  .header-logo span { color: ${BRAND.lightBlue}; }
  .header-tag {
    font-family: 'DM Sans', sans-serif;
    color: rgba(255,255,255,0.55);
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .hero {
    padding: 56px 48px 40px;
    max-width: 860px;
    margin: 0 auto;
  }
  .hero-eyebrow {
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: ${BRAND.lightBlue};
    font-weight: 600;
    margin-bottom: 14px;
  }
  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: 40px;
    color: ${BRAND.navy};
    line-height: 1.15;
    margin-bottom: 16px;
  }
  .hero-sub {
    font-size: 16px;
    color: ${BRAND.muted};
    line-height: 1.7;
    max-width: 600px;
  }

  .card {
    background: ${BRAND.white};
    border-radius: 16px;
    box-shadow: 0 2px 24px rgba(0,59,92,0.07), 0 1px 4px rgba(0,59,92,0.04);
    padding: 36px 40px;
    margin-bottom: 20px;
  }

  .form-container { max-width: 860px; margin: 0 auto; padding: 0 48px 60px; }

  .section-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: ${BRAND.lightBlue};
    margin-bottom: 10px;
  }
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    color: ${BRAND.navy};
    margin-bottom: 6px;
  }
  .section-desc {
    font-size: 14px;
    color: ${BRAND.muted};
    margin-bottom: 24px;
    line-height: 1.6;
  }

  .field-group { margin-bottom: 22px; }
  .field-label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: ${BRAND.navy};
    margin-bottom: 8px;
    letter-spacing: 0.2px;
  }
  .field-label span { color: ${BRAND.lightBlue}; }
  textarea, input[type="text"] {
    width: 100%;
    padding: 14px 16px;
    border: 1.5px solid #D0DEE9;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: ${BRAND.text};
    background: ${BRAND.offWhite};
    transition: border-color 0.2s, box-shadow 0.2s;
    resize: vertical;
    line-height: 1.6;
  }
  textarea:focus, input[type="text"]:focus {
    outline: none;
    border-color: ${BRAND.lightBlue};
    box-shadow: 0 0 0 3px rgba(0,166,214,0.12);
    background: ${BRAND.white};
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 16px 36px;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
  }
  .btn-primary {
    background: linear-gradient(135deg, ${BRAND.blue} 0%, ${BRAND.navy} 100%);
    color: ${BRAND.white};
    box-shadow: 0 4px 16px rgba(0,59,92,0.25);
  }
  .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,59,92,0.35); }
  .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
  .btn-secondary {
    background: ${BRAND.white};
    color: ${BRAND.navy};
    border: 1.5px solid #D0DEE9;
  }
  .btn-secondary:hover { border-color: ${BRAND.lightBlue}; color: ${BRAND.blue}; }

  .loading-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60px 40px;
    text-align: center;
  }
  .spinner {
    width: 44px; height: 44px;
    border: 3px solid ${BRAND.slate};
    border-top-color: ${BRAND.lightBlue};
    border-radius: 50%;
    animation: spin 0.9s linear infinite;
    margin-bottom: 20px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-title { font-family: 'Playfair Display', serif; font-size: 20px; color: ${BRAND.navy}; margin-bottom: 8px; }
  .loading-sub { font-size: 14px; color: ${BRAND.muted}; }

  .results-container { max-width: 860px; margin: 0 auto; padding: 0 48px 60px; }

  .results-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 28px;
  }
  .results-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(135deg, ${BRAND.lightBlue}18, ${BRAND.blue}12);
    border: 1px solid ${BRAND.lightBlue}40;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    color: ${BRAND.blue};
    letter-spacing: 0.5px;
    margin-bottom: 10px;
  }

  .qa-section { margin-bottom: 12px; }
  .qa-section-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    background: ${BRAND.navy};
    border-radius: 10px 10px 0 0;
    cursor: pointer;
    user-select: none;
    transition: background 0.2s;
  }
  .qa-section-header:hover { background: ${BRAND.blue}; }
  .qa-section-num {
    width: 28px; height: 28px;
    background: ${BRAND.lightBlue};
    color: ${BRAND.navy};
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; flex-shrink: 0;
  }
  .qa-section-title {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 600;
    color: ${BRAND.white};
    flex: 1;
  }
  .qa-chevron { color: rgba(255,255,255,0.5); font-size: 12px; transition: transform 0.2s; }
  .qa-chevron.open { transform: rotate(180deg); }
  .qa-section-body {
    background: ${BRAND.white};
    border: 1.5px solid #D0DEE9;
    border-top: none;
    border-radius: 0 0 10px 10px;
    overflow: hidden;
  }

  .qa-item { padding: 20px 24px; border-bottom: 1px solid ${BRAND.slate}; }
  .qa-item:last-child { border-bottom: none; }
  .qa-question {
    font-size: 14px; font-weight: 600;
    color: ${BRAND.navy};
    margin-bottom: 10px;
    display: flex; gap: 8px; align-items: flex-start;
  }
  .qa-q-icon {
    width: 20px; height: 20px;
    background: ${BRAND.blue}15;
    color: ${BRAND.blue};
    border-radius: 4px;
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; font-weight: 700;
    flex-shrink: 0; margin-top: 1px;
  }
  .qa-answer {
    font-size: 13.5px; color: #3A5068;
    line-height: 1.75;
    padding-left: 28px;
    white-space: pre-wrap;
  }
  .qa-tip {
    margin-top: 10px;
    padding: 10px 14px;
    background: ${BRAND.lightBlue}10;
    border-left: 3px solid ${BRAND.lightBlue};
    border-radius: 0 6px 6px 0;
    font-size: 12.5px;
    color: ${BRAND.muted};
    font-style: italic;
    margin-left: 28px;
  }

  .actions-row {
    display: flex; gap: 12px; flex-wrap: wrap;
    margin-top: 28px;
  }

  .gap-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 4px 12px; border-radius: 12px;
    font-size: 12px; font-weight: 600;
  }
  .gap-strong { background: #D1FAE5; color: #065F46; }
  .gap-watch { background: #FEF3C7; color: #92400E; }

  .cheat-sheet {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 16px;
  }
  .cheat-item {
    display: flex; gap: 10px; align-items: flex-start;
    padding: 12px 14px;
    background: ${BRAND.offWhite};
    border-radius: 8px;
    border: 1px solid #D8E8F3;
  }
  .cheat-num {
    font-family: 'Playfair Display', serif;
    font-size: 18px; font-weight: 700;
    color: ${BRAND.lightBlue};
    line-height: 1; flex-shrink: 0;
    min-width: 56px;
  }
  .cheat-desc { font-size: 12.5px; color: ${BRAND.muted}; line-height: 1.5; }

  @media (max-width: 640px) {
    .header { padding: 20px 24px; }
    .hero { padding: 36px 24px 24px; }
    .form-container, .results-container { padding: 0 24px 40px; }
    .hero-title { font-size: 28px; }
    .cheat-sheet { grid-template-columns: 1fr; }
  }
`;

const SYSTEM_PROMPT = `You are an expert career coach specializing in analytics and data professionals. You create highly tailored, specific interview preparation documents.

Given a client's resume and a job description, generate a comprehensive interview prep brief in JSON format.

Return ONLY valid JSON with this exact structure:
{
  "candidateName": "string",
  "targetRole": "string",
  "targetCompany": "string",
  "fitSummary": "2-3 sentence honest assessment of fit strengths and gaps",
  "watchAreas": ["gap1", "gap2"],
  "strengthAreas": ["strength1", "strength2", "strength3"],
  "keyNumbers": [
    {"number": "string", "description": "string"}
  ],
  "sections": [
    {
      "title": "section title",
      "questions": [
        {
          "question": "the interview question",
          "answer": "full suggested answer using their actual experience - be specific, use their real numbers and stories",
          "tip": "brief coaching tip"
        }
      ]
    }
  ],
  "questionsToAsk": ["question1", "question2", "question3", "question4"],
  "salaryGuidance": "specific salary range recommendation with rationale",
  "openingStatement": "full 90-second tell me about yourself answer using their actual background"
}

Sections to include:
1. "Recruiter / Phone Screen" - 2-3 logistics and positioning questions
2. "Behavioral Questions" - 4-5 STAR-format answers using their actual experience  
3. "Technical Questions" - 3-4 technical questions relevant to the role
4. "Role-Specific & Situational" - 2-3 questions addressing gaps or unique aspects of this role

Rules:
- Use the candidate's ACTUAL job titles, companies, and numbers from their resume
- Never fabricate impact numbers - only use what's in the resume
- Be specific and honest - call out real gaps, don't sugarcoat
- Answers should sound natural and conversational, not robotic
- STAR format: clearly label S/T/A/R in behavioral answers
- Keep answers thorough but not exhausting - 150-250 words each`;

function CollapseSection({ num, title, questions, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="qa-section">
      <div className="qa-section-header" onClick={() => setOpen(!open)}>
        <div className="qa-section-num">{num}</div>
        <div className="qa-section-title">{title}</div>
        <div className={`qa-chevron ${open ? "open" : ""}`}>▼</div>
      </div>
      {open && (
        <div className="qa-section-body">
          {questions.map((q, i) => (
            <div key={i} className="qa-item">
              <div className="qa-question">
                <div className="qa-q-icon">Q</div>
                {q.question}
              </div>
              <div className="qa-answer">{q.answer}</div>
              {q.tip && <div className="qa-tip">💡 {q.tip}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function InterviewBriefTool() {
  const [resume, setResume] = useState("");
  const [jd, setJd] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const resultsRef = useRef(null);

  const generate = async () => {
    if (!resume.trim() || !jd.trim()) {
      setError("Please provide both your resume and the job description.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: [{
            role: "user",
            content: `CLIENT NAME: ${name || "Not provided"}

RESUME:
${resume}

JOB DESCRIPTION:
${jd}

Generate the interview prep brief JSON now.`
          }]
        })
      });

      const data = await response.json();
      const text = data.content?.map(b => b.text || "").join("") || "";
      const clean = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      const parsed = JSON.parse(clean);
      setResult(parsed);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch (e) {
      setError("Something went wrong generating your brief. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setResult(null); setResume(""); setJd(""); setName(""); };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <header className="header">
          <div className="header-logo">Clear<span>Line</span> Career Analytics</div>
          <div className="header-tag">Interview Intelligence Brief</div>
        </header>

        {!result && !loading && (
          <>
            <div className="hero">
              <div className="hero-eyebrow">AI-Powered Interview Prep</div>
              <h1 className="hero-title">Your Interview<br />Intelligence Brief</h1>
              <p className="hero-sub">
                Paste your resume and the job description. We'll generate a fully tailored
                Q&A prep document — with your actual stories, real impact numbers,
                and honest gap analysis — in under 60 seconds.
              </p>
            </div>

            <div className="form-container">
              <div className="card">
                <div className="section-label">Step 1 of 3</div>
                <div className="section-title">Your Information</div>
                <div className="section-desc">We'll use your name to personalize the brief.</div>
                <div className="field-group">
                  <label className="field-label">Your Name <span>(optional)</span></label>
                  <input
                    type="text"
                    placeholder="e.g. Jordan Smith"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="card">
                <div className="section-label">Step 2 of 3</div>
                <div className="section-title">Your Resume</div>
                <div className="section-desc">
                  Paste the full text of your resume. Include all jobs, impact numbers,
                  and technical skills — the more specific, the better your brief will be.
                </div>
                <div className="field-group">
                  <label className="field-label">Resume Text <span>*</span></label>
                  <textarea
                    rows={12}
                    placeholder="Paste your full resume text here..."
                    value={resume}
                    onChange={e => setResume(e.target.value)}
                  />
                </div>
              </div>

              <div className="card">
                <div className="section-label">Step 3 of 3</div>
                <div className="section-title">Job Description</div>
                <div className="section-desc">
                  Paste the complete job description you're preparing for.
                  Include the full responsibilities and qualifications sections.
                </div>
                <div className="field-group">
                  <label className="field-label">Job Description <span>*</span></label>
                  <textarea
                    rows={12}
                    placeholder="Paste the full job description here..."
                    value={jd}
                    onChange={e => setJd(e.target.value)}
                  />
                </div>

                {error && (
                  <p style={{ color: "#DC2626", fontSize: 13, marginBottom: 16 }}>{error}</p>
                )}

                <div className="actions-row">
                  <button className="btn btn-primary" onClick={generate} disabled={loading}>
                    <span>⚡</span> Generate My Interview Brief
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {loading && (
          <div className="form-container">
            <div className="card">
              <div className="loading-wrap">
                <div className="spinner" />
                <div className="loading-title">Building your brief...</div>
                <div className="loading-sub">
                  Analyzing your resume against the job description.<br />
                  Crafting tailored STAR answers using your real experience.
                </div>
              </div>
            </div>
          </div>
        )}

        {result && (
          <div className="results-container" ref={resultsRef}>
            <div className="hero" style={{ padding: "40px 0 24px" }}>
              <div className="results-badge">✓ Brief Generated</div>
              <h1 className="hero-title" style={{ fontSize: 32 }}>
                {result.candidateName || name || "Your"} Interview Brief
              </h1>
              <p className="hero-sub" style={{ fontSize: 14 }}>
                {result.targetRole} · {result.targetCompany}
              </p>
            </div>

            {/* Fit Summary */}
            <div className="card" style={{ borderLeft: `4px solid ${BRAND.lightBlue}` }}>
              <div className="section-label">Fit Assessment</div>
              <p style={{ fontSize: 14, color: BRAND.text, lineHeight: 1.75, marginBottom: 16 }}>
                {result.fitSummary}
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {result.strengthAreas?.map((s, i) => (
                  <span key={i} className="gap-badge gap-strong">✓ {s}</span>
                ))}
                {result.watchAreas?.map((w, i) => (
                  <span key={i} className="gap-badge gap-watch">⚠ {w}</span>
                ))}
              </div>
            </div>

            {/* Opening Statement */}
            {result.openingStatement && (
              <div className="card">
                <div className="section-label">Your Opening</div>
                <div className="section-title" style={{ marginBottom: 16 }}>
                  "Tell Me About Yourself" — Your 90-Second Opener
                </div>
                <div style={{
                  padding: "20px 24px",
                  background: BRAND.navy,
                  borderRadius: 10,
                  color: "rgba(255,255,255,0.88)",
                  fontSize: 14, lineHeight: 1.8,
                  fontStyle: "italic",
                  whiteSpace: "pre-wrap"
                }}>
                  "{result.openingStatement}"
                </div>
              </div>
            )}

            {/* Q&A Sections */}
            <div className="card" style={{ padding: "28px 32px" }}>
              <div className="section-label">Interview Questions & Answers</div>
              <div className="section-title" style={{ marginBottom: 20 }}>
                Tailored to This Role & Your Background
              </div>
              {result.sections?.map((section, i) => (
                <CollapseSection
                  key={i}
                  num={i + 1}
                  title={section.title}
                  questions={section.questions}
                  defaultOpen={i === 0}
                />
              ))}
            </div>

            {/* Salary */}
            {result.salaryGuidance && (
              <div className="card" style={{ borderLeft: `4px solid #10B981` }}>
                <div className="section-label">Salary Guidance</div>
                <p style={{ fontSize: 14, color: BRAND.text, lineHeight: 1.75 }}>
                  {result.salaryGuidance}
                </p>
              </div>
            )}

            {/* Questions to Ask */}
            {result.questionsToAsk?.length > 0 && (
              <div className="card">
                <div className="section-label">Questions to Ask Them</div>
                <div className="section-title" style={{ marginBottom: 16 }}>
                  Signal strategic thinking. Close strong.
                </div>
                {result.questionsToAsk.map((q, i) => (
                  <div key={i} style={{
                    display: "flex", gap: 12, padding: "12px 0",
                    borderBottom: i < result.questionsToAsk.length - 1 ? `1px solid ${BRAND.slate}` : "none"
                  }}>
                    <span style={{
                      width: 24, height: 24, background: BRAND.lightBlue + "20",
                      color: BRAND.blue, borderRadius: 6,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, fontWeight: 700, flexShrink: 0
                    }}>{i + 1}</span>
                    <span style={{ fontSize: 14, color: BRAND.text, lineHeight: 1.6 }}>{q}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Key Numbers Cheat Sheet */}
            {result.keyNumbers?.length > 0 && (
              <div className="card">
                <div className="section-label">Quick Reference</div>
                <div className="section-title" style={{ marginBottom: 16 }}>
                  Your Key Impact Numbers
                </div>
                <div className="cheat-sheet">
                  {result.keyNumbers.map((item, i) => (
                    <div key={i} className="cheat-item">
                      <div className="cheat-num">{item.number}</div>
                      <div className="cheat-desc">{item.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="actions-row" style={{ paddingBottom: 20 }}>
              <button className="btn btn-secondary" onClick={reset}>
                ← Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
