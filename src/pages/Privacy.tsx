export function Privacy() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-primary-800 mb-8">Politique de confidentialité</h1>
      
      <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-primary-800 mb-4">1. Collecte des données</h2>
          <p className="text-primary-600">
            Nous collectons les informations suivantes :
          </p>
          <ul className="list-disc list-inside mt-2 text-primary-600">
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Numéro de téléphone</li>
            <li>Adresse de livraison</li>
            <li>Historique des commandes</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-primary-800 mb-4">2. Utilisation des données</h2>
          <p className="text-primary-600">
            Les données collectées sont utilisées pour :
          </p>
          <ul className="list-disc list-inside mt-2 text-primary-600">
            <li>Traiter vos commandes</li>
            <li>Vous contacter concernant votre commande</li>
            <li>Améliorer nos services</li>
            <li>Personnaliser votre expérience</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-primary-800 mb-4">3. Protection des données</h2>
          <p className="text-primary-600">
            Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données personnelles contre tout accès, modification, divulgation ou destruction non autorisés.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-primary-800 mb-4">4. Cookies</h2>
          <p className="text-primary-600">
            Nous utilisons des cookies pour :
          </p>
          <ul className="list-disc list-inside mt-2 text-primary-600">
            <li>Mémoriser vos préférences</li>
            <li>Maintenir votre session</li>
            <li>Analyser l'utilisation du site</li>
            <li>Améliorer nos services</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-primary-800 mb-4">5. Vos droits</h2>
          <p className="text-primary-600">
            Conformément au RGPD, vous disposez des droits suivants :
          </p>
          <ul className="list-disc list-inside mt-2 text-primary-600">
            <li>Droit d'accès à vos données</li>
            <li>Droit de rectification</li>
            <li>Droit à l'effacement</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit à la portabilité des données</li>
            <li>Droit d'opposition</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-primary-800 mb-4">6. Contact</h2>
          <p className="text-primary-600">
            Pour toute question concernant notre politique de confidentialité ou pour exercer vos droits, vous pouvez nous contacter à l'adresse : privacy@pizza-delice.fr
          </p>
        </section>
      </div>
    </div>
  );
}