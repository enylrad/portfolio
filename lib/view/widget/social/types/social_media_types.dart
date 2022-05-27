enum Social {
  github,
  twitter,
  linkedin,
}

class SocialNetwork {
  final Social social;
  final String asset;
  final String url;

  SocialNetwork({
    required this.social,
    required this.asset,
    required this.url,
  });
}

SocialNetwork buildSocialNetwork(Social social, String idUser) {
  switch (social) {
    case Social.github:
      return SocialNetwork(
        social: social,
        url: 'https://github.com/$idUser',
        asset: 'assets/images/github.svg',
      );
    case Social.twitter:
      return SocialNetwork(
        social: social,
        url: 'https://twitter.com/$idUser',
        asset: 'assets/images/twitter.svg',
      );
    case Social.linkedin:
      return SocialNetwork(
        social: social,
        url: 'https://www.linkedin.com/in/$idUser',
        asset: 'assets/images/linkedin.svg',
      );
  }
}