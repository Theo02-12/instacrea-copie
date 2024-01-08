import Link from "next/link"

const PolitiqueConfidentialité = () => {
  return (
    <div>
      <div>
        <h1 className="my-4 font-bold text-[30px] before:content-['|'] before:font-bold before:px-2 text-center">Politique de confidentialité</h1>
        <div className="px-8 my-4 overflow-x-hidden">

          <h3 className="font-bold text-[20px] my-3 uppercase">Politique de confidentialité de Instacréa </h3>
          <p>La présente Politique de confidentialité décrit la façon dont vos informations personnelles sont recueillies, utilisées et partagées lorsque vous vous rendez sur www.instacrea.com (le « Site ») ou que vous y effectuez un achat.
          </p>


          <h4 className="font-bold my-3 text-xl">INFORMATIONS PERSONNELLES RECUEILLIES</h4>
          <p>Lorsque vous vous rendez sur le Site, nous recueillons automatiquement certaines informations concernant votre appareil, notamment des informations sur votre navigateur web, votre adresse IP, votre fuseau horaire et certains des cookies qui sont installés sur votre appareil. En outre, lorsque vous parcourez le Site, nous recueillons des informations sur les pages web ou produits individuels que vous consultez, les sites web ou les termes de recherche qui vous ont permis d&apos;arriver sur le Site, ainsi que des informations sur la manière dont vous interagissez avec le Site. Nous désignons ces informations collectées automatiquement sous l&apos;appellation « Informations sur l&apos;appareil ».
          </p>

          <div className="my-3">
            <h5 className="my-2">Nous recueillons les Informations sur l&apos;appareil à l&apos;aide des technologies suivantes :</h5>
            <ul>
              <li className="font-bold py-1"> FICHIERS TÉMOINS (COOKIES)</li>
              <li className="font-bold py-1">Voici une liste de fichiers témoins que nous utilisons. Nous les avons énumérés ici pour que vous ayez la possibilité de choisir si vous souhaitez les autoriser ou non:
              </li>

              <li className='py-1'>
                <b>_session_id</b>, identificateur unique de session, permet à Shopify de stocker les informations relatives à votre session (référent, page de renvoi, etc.).
              </li>

              <li className='py-1'>
                <b>_shopify_visit</b>, aucune donnée retenue, persiste pendant 30 minutes depuis la dernière visite. Utilisé par le système interne de suivi des statistiques du fournisseur de notre site web pour enregistrer le nombre de visites.
              </li>

              <li className='py-1'>
                <b>_shopify_uniq</b>, aucune donnée retenue, expire à minuit (selon l&apos;emplacement du visiteur) le jour suivant. Calcule le nombre de visites d&apos;une boutique par client unique.
              </li>

              <li className='py-1'>
                <b>cart</b>, identificateur unique, persiste pendant 2 semaines, stocke l&apos;information relative à votre panier d&apos;achat.
              </li>

              <li className='py-1'><b>_secure_session_id</b>, identificateur unique de session</li>

              <li className='py-1'>
                <b>storefront_digest</b>, identificateur unique, indéfini si la boutique possède un mot de passe, il est utilisé pour savoir si le visiteur actuel a accès.


              </li>
              <li className="my-3"> - Les <b>«fichiers journaux»</b> suivent l&apos;activité du Site et recueillent des données telles que votre adresse IP, le type de navigateur que vous utilisez, votre fournisseur d&apos;accès Internet, vos pages référentes et de sortie, et vos données d&apos;horodatage (date et heure).</li>
              <li className='py-1'> - Les <b>«pixels invisibles»</b>, les <b>«balises»</b> et les <b>«pixels»</b> sont des fichiers électroniques qui enregistrent des informations sur la façon dont vous parcourez le Site.</li>
              <li>
                Lorsque nous utilisons l&apos;expression «Informations personnelles» dans la présente Politique de confidentialité, nous faisons allusion à la fois aux Informations sur l&apos;appareil et aux Informations sur la commande.
              </li>
            </ul>
          </div>

          <h4 className="font-bold my-3 text-xl">COMMENT UTILISONS-NOUS VOS INFORMATIONS PERSONNELLES ?</h4>
          <p>
            En règle générale, nous utilisons les Informations sur la commande que nous recueillons pour traiter toute commande passée par le biais du Site (y compris pour traiter vos informations de paiement, organiser l&apos;expédition de votre commande et vous fournir des factures et/ou des confirmations de commande).  En outre, nous utilisons ces Informations sur la commande pour :
            communiquer avec vous;
            évaluer les fraudes ou risques potentiels; et
            lorsque cela correspond aux préférences que vous nous avez communiquées, vous fournir des informations ou des publicités concernant nos produits ou services.
            <br /><br />
            Nous utilisons les Informations sur l&apos;appareil (en particulier votre adresse IP) que nous recueillons pour évaluer les fraudes ou risques potentiels et, de manière plus générale, pour améliorer et optimiser notre Site (par exemple, en générant des analyses sur la façon dont nos clients parcourent et interagissent avec le Site, et pour évaluer la réussite de nos campagnes de publicité et de marketing).
            <br /><br />
            Nous partageons vos Informations personnelles avec des tiers qui nous aident à les utiliser aux fins décrites précédemment.  Par exemple, nous utilisons Shopify pour héberger notre boutique en ligne – pour en savoir plus sur l&apos;utilisation de vos Informations personnelles par Shopify, veuillez consulter la page suivante :<Link className="hover:underline" href='https://www.shopify.fr/legal/confidentialite'>https://www.shopify.fr/legal/confidentialite</Link> .  Nous utilisons également Google Analytics pour mieux comprendre comment nos clients utilisent le Site – pour en savoir plus sur l&apos;utilisation de vos Informations personnelles par Google, veuillez consulter la page suivante : <Link className="hover:underline" href='https://www.google.com/intl/fr/policies/privacy/'>https://www.google.com/intl/fr/policies/privacy/</Link>.  Vous pouvez aussi désactiver Google Analytics ici : <Link className="hover:underline" href='https://tools.google.com/dlpage/gaoptout'>https://tools.google.com/dlpage/gaoptout</Link>.
            <br /><br />
            Enfin, il se peut que nous partagions aussi vos Informations personnelles pour respecter les lois et règlementations applicables, répondre à une assignation, à un mandat de perquisition ou à toute autre demande légale de renseignements que nous recevons, ou pour protéger nos droits.
            <br /><br />
            Comme indiqué ci-dessus, nous utilisons vos Informations personnelles pour vous proposer des publicités ciblées ou des messages de marketing qui, selon nous, pourraient vous intéresser.  Pour en savoir plus sur le fonctionnement de la publicité ciblée, vous pouvez consulter la page d&apos;information de la Network Advertising Initiative (NAI) à l&apos;adresse suivante : <Link className="hover:underline" href='http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work'>http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work</Link>.

          </p>
          <div className="my-3">
            Vous pouvez refuser la publicité ciblée ici :
            <ul className="my-3">
              <li className="font-bold">QUELQUES LIENS COURANTS :</li>
              <li className="py-1">FACEBOOK - <Link href='https://www.facebook.com/settings/?tab=ads' className="hover:underline">https://www.facebook.com/settings/?tab=ads</Link></li>
              <li className="py-1">GOOGLE - <Link href='https://www.google.com/settings/ads/anonymous' className="hover:underline">https://www.google.com/settings/ads/anonymous</Link></li>
              <li className="py-1">BING - <Link href='https://about.ads.microsoft.com/fr-fr/ressources/politiques/annonces-personnalisees' className="hover:underline">https://about.ads.microsoft.com/fr-fr/ressources/politiques/annonces-personnalisees</Link></li>
            </ul>
            <p>
              En outre, vous pouvez refuser certains de ces services en vous rendant sur le portail de désactivation de Digital Advertising Alliance à l&apos;adresse suivante : <Link className="hover:underline" href='https://optout.aboutads.info/?c=3&lang=fr'>https://optout.aboutads.info/?c=3&lang=fr</Link>.
            </p>
          </div>

          <h4 className="font-bold my-3 text-xl">NE PAS SUIVRE</h4>
          <p>
            Veuillez noter que nous ne modifions pas la collecte de données de notre Site et nos pratiques d&apos;utilisation lorsque nous détectons un signal «Ne pas suivre» sur votre navigateur.
          </p>

          <h4 className="font-bold my-3 text-xl">VOS DROITS</h4>
          <p>
            Si vous êtes résident(e) européen(ne), vous disposez d&apos;un droit d&apos;accès aux informations personnelles que nous détenons à votre sujet et vous pouvez demander à ce qu&apos;elles soient corrigées, mises à jour ou supprimées. Si vous souhaitez exercer ce droit, veuillez nous contacter au moyen des coordonnées précisées ci-dessous.
            Par ailleurs, si vous êtes résident(e) européen(ne), notez que nous traitons vos informations dans le but de remplir nos obligations contractuelles à votre égard (par exemple si vous passez une commande sur le Site) ou de poursuivre nos intérêts commerciaux légitimes, énumérés ci-dessus.  Veuillez également noter que vos informations seront transférées hors de l&apos;Europe, y compris au Canada et aux États-Unis.
          </p>

          <h4 className="font-bold my-3 text-xl">RÉTENTION DES DONNÉES</h4>
          <p>
            Lorsque vous passez une commande par l&apos;intermédiaire du Site, nous conservons les Informations sur votre commande dans nos dossiers, sauf si et jusqu&apos;à ce que vous nous demandiez de les supprimer.
          </p>

          <h4 className="font-bold my-3 text-xl">CHANGEMENTS</h4>
          <p>
            Nous pouvons être amenés à modifier la présente politique de confidentialité de temps à autre afin d&apos;y refléter, par exemple, les changements apportés à nos pratiques ou pour d&apos;autres motifs opérationnels, juridiques ou réglementaires.
          </p>

          <h4 className="font-bold my-3 text-xl">NOUS CONTACTER</h4>
          <p>Pour en savoir plus sur nos pratiques de confidentialité, si vous avez des questions ou si vous souhaitez déposer une réclamation, veuillez nous contacter par e-mail à <Link href='mailto:contact@instacrea.com' className="hover:underline">contact@instacrea.com</Link> , ou par courrier à l&apos;adresse suivante :
            <br /><br />
            3 Rue de Sangatte, App132, BOULOGNE SUR MER, haut de france, 62200, France
          </p>

        </div>
      </div>
    </div>
  )
}

export default PolitiqueConfidentialité