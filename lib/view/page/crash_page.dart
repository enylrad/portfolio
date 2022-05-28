import 'package:flutter/material.dart';
import 'package:my_portfolio/view/widget/error_widget.dart';

class CrashPage extends StatelessWidget {
  static const String route = '/crash';

  const CrashPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
          padding: const EdgeInsets.all(20.0),
          alignment: Alignment.center,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: const [
              ErrorLottie(),
            ],
          )),
    );
  }
}
