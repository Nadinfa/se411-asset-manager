export default function About() {
  const members = [
    { name: 'Nadin Alaskar', id: '222410587' },
    { name: 'Leena Almosa', id: '222410578' },
  ];

  return (
    <main className="page narrow">
      <section className="page-header">
        <div>
          <p className="eyebrow">About</p>
          <h1>Meet the Team</h1>
          <p>This application was created for the SE411 Fall 2026–27 course project.</p>
        </div>
      </section>

      <section className="about-card">
        <h2>Project</h2>
        <p><strong>AssetTrack</strong> is a React and Spring Boot application for managing company computer assets. Part 1 was a React frontend; Part 2 connects it to a Spring Boot REST API using Spring Data JDBC and an H2 database.</p>
      </section>

      <section className="team-grid">
        {members.map((member, index) => (
          <article className="member-card" key={`${member.name}-${index}`}>
            <div className="avatar">{index + 1}</div>
            <h3>{member.name}</h3>
            <p>{member.id}</p>
          </article>
        ))}
      </section>


    </main>
  );
}
