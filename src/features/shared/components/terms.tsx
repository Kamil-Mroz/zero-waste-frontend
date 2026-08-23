import Section from "./section";

export default function Terms() {
	return (
		<article className="max-w-prose mx-auto grid gap-8 mb-20">
			<h1 className="text-2xl font-bold">Terms &amp; Conditions</h1>
			<p>
				<strong>Last updated:</strong> August 23, 2026
			</p>

			<Section title="1. About Zero Waste">
				<p>
					Zero Waste is a personal, non-commercial demonstration project created
					to showcase a web application designed to encourage reuse and reduce
					unnecessary waste.
				</p>
				<p>
					The application allows users to publish information about unwanted
					items, express interest in receiving items published by other users,
					and manage offers through the platform.
				</p>
				<p>
					<strong>
						Zero Waste is a demonstration project and is not intended to
						facilitate commercial transactions.
					</strong>{" "}
					Users should not use the platform to exchange money, valuable goods,
					illegal items, or services.
				</p>
				<p>
					By creating an account or using Zero Waste, you agree to these Terms
					&amp; Conditions.
				</p>
			</Section>

			<Section title="2. Eligibility">
				<p>
					You must be at least <strong>18 years old</strong> to create an
					account or use features that require authentication.
				</p>
				<p>By using Zero Waste, you confirm that:</p>
				<ul className="list-disc ml-8">
					<li>you are at least 18 years old;</li>
					<li>
						the information you provide is accurate to the best of your
						knowledge;
					</li>
					<li>you will use the platform in accordance with applicable law;</li>
					<li>
						you will not use the platform for unlawful or fraudulent activities.
					</li>
				</ul>
			</Section>

			<Section title="3. User Accounts">
				<p>
					Users can create an account using supported third-party authentication
					providers, currently Google and GitHub.
				</p>
				<p>During authentication, Zero Waste may receive and store:</p>
				<ul className="list-disc ml-8">
					<li>email address;</li>
					<li>username;</li>
					<li>user ID associated with the authentication provider.</li>
				</ul>
				<p>
					Users are responsible for maintaining the security of their
					authentication method and for activity performed through their
					account.
				</p>
				<p>
					Users may delete their account through the account settings available
					within Zero Waste.
				</p>
			</Section>

			<Section title="4. Item Listings">
				<p>Authenticated users may create item listings containing:</p>
				<ul className="list-disc ml-8">
					<li>title;</li>
					<li>description;</li>
					<li>item condition;</li>
					<li>category;</li>
					<li>pickup city;</li>
					<li>visibility status;</li>
					<li>photographs of the item.</li>
				</ul>
				<p>
					A maximum of <strong>five photographs</strong> may be uploaded for a
					single item. Each photograph must not exceed <strong>5 MB</strong>.
				</p>
				<p>
					Users are responsible for ensuring that information and photographs
					included in their listings are lawful and do not infringe the rights
					of other people.
				</p>
			</Section>

			<Section title="5. Offers and Giving Items Away">
				<p>
					Users may express interest in receiving an available item. The owner
					may accept or reject an offer.
				</p>
				<p>When an offer is accepted:</p>
				<ul className="list-disc ml-8">
					<li>
						the item is marked as <strong>given</strong>
					</li>
					<li>
						all other pending offers for that item are automatically rejected;
					</li>
					<li>the accepted user receives a notification.</li>
				</ul>
				<p>
					Zero Waste does not participate in or guarantee the physical handover
					of items between users. Users are responsible for arranging collection
					or handover themselves.
				</p>
				<p>
					Zero Waste does not guarantee that an item exists, is accurately
					described, is in the stated condition, or will actually be handed
					over.
				</p>
			</Section>

			<Section title="6. Reviews and Ratings">
				<p>
					After an offer has been accepted, the accepted user may submit a
					review of the person who provided the item.
				</p>
				<p>Reviews may contain a star rating and written feedback.</p>
				<p>
					Users must ensure reviews are honest and based on their actual
					experience.
				</p>
				<p>
					Users must not use reviews to harass or threaten another person,
					publish unlawful or private information, discriminate against another
					person, manipulate ratings, or publish spam or misleading content.
				</p>
			</Section>

			<Section title="7. User Profiles">
				<p>
					Users may view information made available through other users&apos;
					public profiles, including:
				</p>
				<ul className="list-disc ml-8">
					<li>username;</li>
					<li>recent reviews;</li>
					<li>rating distribution;</li>
					<li>number of listed items;</li>
					<li>number of available items;</li>
					<li>number of given items;</li>
					<li>recently listed items.</li>
				</ul>
			</Section>

			<Section title="8. Notifications">
				<p>
					Zero Waste may send notifications when another user submits an offer,
					an offer is accepted, or an offer is rejected.
				</p>
			</Section>

			<Section title="9. Eco Hub and Writer Accounts">
				<p>
					Zero Waste may include an Eco Hub containing sustainability-related
					blog posts.
				</p>
				<p>
					Users with the <strong>Writer</strong> role may create, edit, and
					delete their own articles.
				</p>
				<p>
					Writers are responsible for the content they publish. Articles must
					not contain unlawful, defamatory, hateful, discriminatory, misleading,
					or otherwise prohibited content.
				</p>
			</Section>

			<Section title="10. Administration and Moderation">
				<p>
					Zero Waste provides users with mechanisms for reporting content or
					accounts that may violate these Terms &amp; Conditions or applicable
					law.
				</p>
				<p>Users may report:</p>
				<ul className="list-disc ml-8">
					<li>item listings;</li>
					<li>user profiles;</li>
					<li>blog posts;</li>
					<li>reviews and ratings</li>
				</ul>
				<p>
					Reports may be reviewed by an administrator for moderation and safety
					purposes.
				</p>
				<p>
					Administrators may review reported content, take appropriate
					moderation actions, and hide content or profiles that violate these
					Terms &amp; Conditions, applicable law, or the rules of the platform.
				</p>
				<p>Depending on the circumstances, administrators may also:</p>

				<ul className="list-disc ml-8">
					<li>hide an item listing;</li>
					<li>hide a blog post;</li>
					<li>hide a review;</li>
					<li>restrict a user account;</li>
					<li>
						take other reasonable actions necessary to protect the platform and
						its users.
					</li>
				</ul>
				<p>
					Submitting a report does not guarantee that any particular action will
					be taken. Reports are reviewed based on the available information and
					applicable rules.
				</p>
				<p>
					Users must not submit false, abusive, or intentionally misleading
					reports.
				</p>
				<p>
					The reporting system is intended to help maintain a safe and
					appropriate environment for users and does not guarantee that all
					inappropriate content will be detected or removed.
				</p>
			</Section>
			<Section title="11. Prohibited Activities">
				<p>Users must not use Zero Waste to:</p>
				<ul className="list-disc ml-8">
					<li>sell or purchase goods;</li>
					<li>request or exchange money;</li>
					<li>publish illegal or stolen items;</li>
					<li>publish dangerous or regulated items;</li>
					<li>publish content that infringes intellectual property rights;</li>
					<li>impersonate another person;</li>
					<li>harass, threaten, or abuse other users;</li>
					<li>distribute malware or malicious code;</li>
					<li>attempt unauthorised access to the application;</li>
					<li>interfere with the operation or security of the application;</li>
					<li>manipulate reviews or ratings;</li>
					<li>use the platform for spam or automated abuse;</li>
					<li>upload unlawful photographs or other content.</li>
				</ul>
			</Section>

			<Section title="12. User Content">
				<p>Users remain responsible for content they submit to Zero Waste.</p>
				<p>
					By uploading content, including photographs, descriptions, reviews,
					and blog posts, you grant Zero Waste a limited, non-exclusive right to
					store, process, display, and technically reproduce that content only
					as necessary to operate the application.
				</p>
				<p>
					This permission ends when the relevant content is deleted, except
					where temporary retention is technically necessary or required by law.
				</p>
			</Section>

			<Section title="13. Intellectual Property">
				<p>
					The Zero Waste application, including its source code, design,
					interface, branding, and original software components, is owned by the
					project author unless otherwise stated.
				</p>
				<p>
					User-generated content remains the responsibility of the respective
					user.
				</p>
				<p>
					Users must not copy, redistribute, sell, or commercially exploit the
					Zero Waste application without appropriate permission.
				</p>
			</Section>

			<Section title="14. Demonstration Project Disclaimer">
				<p>
					Zero Waste is provided as a{" "}
					<strong>personal demonstration project</strong>.
				</p>
				<p>
					The application may contain bugs, incomplete functionality, temporary
					outages, or features that are still under development.
				</p>
				<p>
					The application is provided without guarantees regarding availability,
					uninterrupted operation, accuracy of user-generated content,
					availability of listed items, successful handover of items, security
					against every possible attack, or suitability for any particular
					purpose.
				</p>
				<p>
					Users should not rely on Zero Waste for commercial transactions or the
					exchange of valuable property.
				</p>
			</Section>

			<Section title="15. Limitation of Liability">
				<p>
					To the extent permitted by applicable law, the project author is not
					responsible for disputes, losses, damages, injuries, or other
					consequences resulting from interactions or physical exchanges between
					users.
				</p>
				<p>
					Zero Waste only provides the technical platform and does not act as a
					party to any arrangement between users.
				</p>
				<p>
					Nothing in these Terms excludes or limits liability where such
					exclusion or limitation is prohibited by applicable law.
				</p>
			</Section>

			<Section title="16. Account Termination">
				<p>Users may delete their accounts through the account settings.</p>
				<p>
					The project author may suspend or delete an account if the user
					violates these Terms, applicable law, or threatens the security or
					operation of the application.
				</p>
				<p>
					Deletion of an account may result in the removal of information and
					content associated with that account, subject to technical
					requirements and legal obligations.
				</p>
			</Section>

			<Section title="17. Changes to the Application">
				<p>
					Zero Waste is an evolving demonstration project. Features may be
					added, changed, suspended, or removed without prior notice.
				</p>
				<p>
					These Terms may also be updated when necessary. The latest version
					will be published on the application.
				</p>
			</Section>

			<Section title="18. Governing Law">
				<p>
					These Terms are governed by the laws of the{" "}
					<strong>Republic of Poland</strong>, unless mandatory provisions of
					applicable law provide otherwise.
				</p>
				<p>
					Any disputes shall be handled by the competent courts in accordance
					with applicable Polish and European Union law.
				</p>
			</Section>

			<Section title="19. Contact">
				<p>
					<strong>Email:</strong> kamilmp17@gmail.com
				</p>
				<p>
					<strong>Data Controller / Project Author:</strong> Kamil Mróz
				</p>
			</Section>

			<Section title="20. Acceptance">
				<p>
					By creating an account or using authenticated features of Zero Waste,
					you confirm that you have read and understood these Terms &amp;
					Conditions and agree to comply with them.
				</p>
			</Section>
		</article>
	);
}
