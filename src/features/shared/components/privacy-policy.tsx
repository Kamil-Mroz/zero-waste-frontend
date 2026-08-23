import Section from "./section";

export default function PrivacyPolicy() {
	return (
		<article className=" max-w-prose mx-auto grid gap-8 mb-20">
			<h1 className="text-2xl font-bold">Privacy Policy</h1>
			<p>
				<strong>Last updated:</strong> August 23, 2026
			</p>

			<Section title="1. Introduction">
				<p>
					This Privacy Policy explains how Zero Waste processes personal data
					when you use the application.
				</p>
				<p>
					Zero Waste is a personal, non-commercial demonstration project created
					to showcase a web application focused on reuse and reducing
					unnecessary waste.
				</p>
				<p>
					This Privacy Policy applies to visitors and registered users of Zero
					Waste.
				</p>
				<p>
					The processing of personal data is carried out in accordance with
					applicable data protection legislation, including the General Data
					Protection Regulation (EU) 2016/679 (GDPR).
				</p>
			</Section>

			<Section title="2. Data Controller">
				<p>
					<strong>Data Controller:</strong> Kamil Mróz
				</p>
				<p>
					<strong>Email:</strong> kamilmp17@gmail.com
				</p>
				<p>
					<strong>Country:</strong> Poland
				</p>
				<p>
					For privacy-related questions or requests concerning your personal
					data, please contact the Data Controller using the email address
					above.
				</p>
			</Section>

			<Section title="3. Personal Data We Collect">
				<p>
					Zero Waste follows the principle of data minimisation and collects
					only information necessary for the operation of the application.
				</p>

				<h3>3.1 Account Information</h3>
				<p>
					When you create an account using Google or GitHub, Zero Waste may
					receive and store:
				</p>
				<ul className="list-disc ml-8">
					<li>email address;</li>
					<li>username;</li>
					<li>user ID associated with the authentication provider.</li>
				</ul>
				<p>Zero Waste does not store your Google or GitHub password.</p>

				<h3>3.2 Authentication Provider Information</h3>
				<p>
					You may authenticate using Google or GitHub. You are redirected to the
					provider&apos;s authentication page. After successful authentication,
					the provider returns an authorisation code to the Zero Waste backend,
					which uses the process to verify your identity and obtain the limited
					account information required by Zero Waste.
				</p>

				<h3>3.3 User Profile Information</h3>
				<p>
					Your username and information associated with your activity may be
					visible to other users, including:
				</p>
				<ul className="list-disc ml-8">
					<li>username;</li>
					<li>reviews written about you;</li>
					<li>rating distribution;</li>
					<li>number of listed items;</li>
					<li>number of available items;</li>
					<li>number of given items;</li>
					<li>recent item listings.</li>
				</ul>

				<h3>3.4 Item Listings</h3>
				<p>
					When you publish an item, Zero Waste stores information you provide,
					including title, description, condition, category, pickup city,
					visibility status, and photographs.
				</p>
				<p>
					You may upload up to five photographs for one item. Each photograph
					must not exceed 5 MB.
				</p>

				<h3>3.5 Offers and Reviews</h3>
				<p>
					Zero Waste stores information related to offers submitted by users.
					This allows item owners to accept or reject offers and update item
					status.
				</p>
				<p>
					After an offer is accepted, the relevant user may submit a star rating
					and written review. Reviews may be displayed on user profiles.
				</p>

				<h3>3.6 Notifications</h3>
				<p>
					Zero Waste processes information necessary to provide notifications
					when another user submits an offer, an offer is accepted, or an offer
					is rejected.
				</p>

				<h3>3.7 IP Addresses and Security</h3>
				<p>
					The application infrastructure may process IP addresses for security
					and abuse-prevention purposes. Traefik is used as part of the
					infrastructure and can apply rate-limiting rules based on IP
					addresses.
				</p>
				<p>
					IP addresses may therefore be processed to help prevent excessive
					requests, reduce abuse, protect application availability, and protect
					the infrastructure against certain types of automated traffic.
				</p>
				<p>
					Zero Waste does not use IP addresses for advertising or behavioural
					profiling.
				</p>

				<h3>3.8 Application Logs</h3>
				<p>
					The application may generate technical logs necessary to operate and
					maintain the service. These may include information relating to
					application errors, database operations, and technical events required
					for troubleshooting.
				</p>
			</Section>

			<Section title="4. Purposes and Legal Bases">
				<h3>Account creation and authentication</h3>
				<p>
					<strong>Purpose:</strong> creating and maintaining your account and
					allowing you to authenticate.
				</p>
				<p>
					<strong>Data:</strong> email address, username, provider user ID.
				</p>
				<p>
					<strong>Legal basis:</strong> performance of a contract or taking
					steps at your request before entering into a contract, where
					applicable under Article 6(1)(b) GDPR.
				</p>

				<h3>Operation of the platform</h3>
				<p>
					<strong>Purpose:</strong> providing item listings, offers, profiles,
					reviews, and notifications.
				</p>
				<p>
					<strong>Data:</strong> account information, item information, offers,
					reviews, and related activity.
				</p>
				<p>
					<strong>Legal basis:</strong> performance of a contract under Article
					6(1)(b) GDPR, where applicable.
				</p>

				<h3>Security and abuse prevention</h3>
				<p>
					<strong>Purpose:</strong> protecting the application and
					infrastructure against abuse and excessive traffic.
				</p>
				<p>
					<strong>Data:</strong> IP address and technical information.
				</p>
				<p>
					<strong>Legal basis:</strong> legitimate interests under Article
					6(1)(f) GDPR, where applicable.
				</p>

				<h3>Compliance with legal obligations</h3>
				<p>
					<strong>Purpose:</strong> complying with applicable legal obligations
					and responding to lawful requests from competent authorities.
				</p>
				<p>
					<strong>Legal basis:</strong> compliance with a legal obligation under
					Article 6(1)(c) GDPR.
				</p>
			</Section>

			<Section title="5. Data Sharing">
				<p>Zero Waste does not sell personal data.</p>
				<p>
					Personal data may be processed by third-party services where necessary
					for authentication, hosting, infrastructure, security, or delivery of
					the application.
				</p>
				<ul className="list-disc ml-8">
					<li>
						<strong>Google</strong> — authentication provider when Google
						Sign-In is selected.
					</li>
					<li>
						<strong>GitHub</strong> — authentication provider when GitHub
						authentication is selected.
					</li>
					<li>
						<strong>Cloudflare</strong> — Cloudflare Tunnel is used to provide
						secure external access to the self-hosted infrastructure.
					</li>
				</ul>
				<p>
					The relevant third-party providers process data under their own terms
					and privacy policies.
				</p>
			</Section>

			<Section title="6. Hosting and Storage">
				<p>
					Zero Waste is hosted on privately operated hardware using Docker-based
					infrastructure.
				</p>
				<p>
					Uploaded photographs and application data are stored on the storage
					devices used by the Zero Waste infrastructure.
				</p>
				<p>
					External access to the application is provided through Cloudflare
					Tunnel.
				</p>
				<p>
					Technical measures are used to protect the infrastructure, including
					controlled access to services and network-level security mechanisms.
				</p>
			</Section>

			<Section title="7. Data Retention">
				<p>
					Personal data is retained only for as long as necessary for the
					purposes for which it is processed, subject to applicable legal
					requirements.
				</p>
				<p>
					Your account data is generally retained while your account remains
					active.
				</p>
				<p>
					You can delete your account through the account settings. When an
					account is deleted, information associated with that account is
					deleted or otherwise removed from the active application environment,
					subject to technical limitations and information that must be retained
					to comply with legal obligations or protect the rights and security of
					the service.
				</p>
				<p>
					Technical logs may be retained for a limited period necessary for
					troubleshooting, security, and system maintenance.
				</p>
			</Section>

			<Section title="8. Account Deletion">
				<p>
					You can delete your Zero Waste account through the account settings.
				</p>
				<p>
					Account deletion is intended to remove personal data and content
					associated with your account from the active application.
				</p>
				<p>
					If certain information must be retained because of a legal obligation,
					security requirement, or legitimate need to establish or defend legal
					claims, that information may be retained for the applicable period.
				</p>
			</Section>

			<Section title="9. Your GDPR Rights">
				<p>
					Depending on the circumstances and applicable law, you may have the
					following rights:
				</p>
				<ul className="list-disc ml-8">
					<li>
						the right to be informed about the processing of your personal data;
					</li>
					<li>the right to access your personal data;</li>
					<li>the right to correct inaccurate or incomplete data;</li>
					<li>the right to request erasure of your personal data;</li>
					<li>the right to request restriction of processing;</li>
					<li>the right to data portability;</li>
					<li>the right to object to certain processing;</li>
					<li>
						the right to withdraw consent where processing is based on consent;
					</li>
					<li>
						rights relating to automated decision-making and profiling, where
						applicable.
					</li>
				</ul>
				<p>
					To exercise your rights, contact <strong>kamilmp17@gmail.com</strong>.
					We may need to verify your identity before processing certain
					requests.
				</p>
			</Section>

			<Section title="10. Right to Lodge a Complaint">
				<p>
					If you believe that your personal data is being processed in violation
					of applicable data protection law, you have the right to lodge a
					complaint with a competent supervisory authority.
				</p>
				<p>
					As the Data Controller is based in Poland, you may contact the{" "}
					<strong>
						President of the Personal Data Protection Office (UODO)
					</strong>
					.
				</p>
				<p>
					You may also contact the supervisory authority in the EU/EEA country
					where you live, work, or where you believe the alleged infringement
					occurred, where permitted by applicable law.
				</p>
			</Section>

			<Section title="11. Cookies">
				<p>
					Zero Waste uses cookies that are necessary for authentication and
					maintaining your logged-in session.
				</p>
				<p>
					These cookies are used to maintain your authenticated session, provide
					secure access to your account, and support the basic functionality of
					the application.
				</p>
				<p>
					Zero Waste does not use these cookies for advertising, behavioural
					profiling, or cross-site tracking.
				</p>
				<p>
					Strictly necessary cookies may be exempt from consent requirements
					that apply to non-essential cookies. If additional non-essential
					cookies, analytics, advertising technologies, or tracking mechanisms
					are introduced, this Privacy Policy will be updated and an appropriate
					consent mechanism will be implemented where required.
				</p>
			</Section>

			<Section title="12. Third-Party Authentication">
				<p>
					When you choose Google or GitHub authentication, you leave the Zero
					Waste application and interact with the selected provider.
				</p>
				<p>
					The authentication provider may process your information according to
					its own privacy policy.
				</p>
				<p>
					Zero Waste only requests and stores the information required for
					authentication and account functionality.
				</p>
			</Section>

			<Section title="13. Children's Privacy">
				<p>
					Zero Waste is intended only for people who are{" "}
					<strong>18 years of age or older</strong>.
				</p>
				<p>
					We do not knowingly provide accounts to individuals under 18. If we
					become aware that a person under 18 has created an account, we may
					take steps to remove the account and associated information.
				</p>
			</Section>

			<Section title="14. User-Generated Content">
				<p>
					Zero Waste allows users to publish item descriptions, photographs,
					reviews, and blog posts.
				</p>
				<p>
					Users are responsible for ensuring that the content they publish is
					lawful and does not violate the rights of other people.
				</p>
				<p>
					Users should not publish sensitive personal information about
					themselves or other people in item listings, reviews, photographs, or
					articles.
				</p>
			</Section>

			<Section title="15. Moderation and Safety">
				<p>
					Zero Waste allows users to report content or profiles that they
					believe violate the Terms &amp; Conditions or applicable law.
				</p>
				<p>Users may report:</p>

				<ul className="list-disc ml-8">
					<li>item listings;</li>
					<li>user profiles;</li>
					<li>blog posts;</li>
					<li>reviews and ratings.</li>
				</ul>
				<p>
					When a report is submitted, Zero Waste may process information
					necessary to investigate and manage the report. This may include the
					identity of the reporting user, the reported content or account, the
					reason for the report, and information related to the reported
					content.
				</p>
				<p>
					Reports are used for moderation, safety, abuse prevention, and
					enforcement of the platform's Terms &amp; Conditions.
				</p>
				<p>
					Administrators may review reports and take appropriate action. This
					may include hiding or removing reported content, restricting an
					account, or deleting an account where appropriate.
				</p>
				<p>
					The processing of report-related information is based, where
					applicable, on the legitimate interests of the Data Controller in
					maintaining the security, integrity, and proper operation of the
					platform, as well as enforcing the platform's Terms & Conditions.
				</p>
				<p>
					Reports are retained only for as long as reasonably necessary to
					investigate the report, take appropriate action, resolve disputes,
					maintain platform security, and comply with applicable legal
					obligations.
				</p>
			</Section>

			<Section title="16. Security">
				<p>
					Reasonable technical and organisational measures are used to protect
					personal data against unauthorised access, accidental loss,
					destruction, or alteration.
				</p>
				<p>
					The application is operated using a self-hosted Docker environment and
					protected through infrastructure-level security measures.
				</p>
				<p>
					However, no internet-based application or storage system can guarantee
					absolute security.
				</p>
			</Section>

			<Section title="17. International Data Transfers">
				<p>
					Because Zero Waste uses third-party services such as Google, GitHub,
					and Cloudflare, some personal data may be processed outside Poland or
					the European Economic Area depending on the provider and service
					involved.
				</p>
				<p>
					Where applicable, such transfers should be subject to appropriate
					safeguards required by applicable data protection law.
				</p>
				<p>
					Users should consult the privacy documentation of the relevant
					third-party provider for additional information about its
					international data processing.
				</p>
			</Section>

			<Section title="18. Automated Decision-Making">
				<p>
					Zero Waste does not use personal data to make decisions that produce
					legal or similarly significant effects on users through automated
					decision-making or profiling.
				</p>
				<p>
					The application may use automated technical mechanisms such as rate
					limiting to protect the infrastructure from excessive or abusive
					traffic. Such mechanisms are security measures and are not used to
					evaluate users for legal or similarly significant purposes.
				</p>
			</Section>

			<Section title="19. Changes to this Privacy Policy">
				<p>
					This Privacy Policy may be updated when the application, its data
					processing activities, or applicable legal requirements change.
				</p>
				<p>The latest version will be published on the Zero Waste website.</p>
				<p>
					The &quot;Last updated&quot; date at the beginning of this document
					indicates when the Privacy Policy was most recently revised.
				</p>
			</Section>

			<Section title="20. Contact">
				<p>
					<strong>Data Controller:</strong> Kamil Mróz
				</p>
				<p>
					<strong>Email:</strong> kamilmp17@gmail.com
				</p>
				<p>
					<strong>Country:</strong> Poland
				</p>
			</Section>
		</article>
	);
}
