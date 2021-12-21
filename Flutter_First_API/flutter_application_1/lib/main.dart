import 'package:flutter/material.dart';

import 'second_page.dart';
import 'third_page.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  int number = 0;
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: MySchafoldApp(),
      routes: {
        SecondPage.routeName: (_) => SecondPage(),
        ThirdPage.routeName: (_) => ThirdPage()
      },
    );
  }
}

class MySchafoldApp extends StatefulWidget {
  @override
  _MySchafoldAppState createState() => _MySchafoldAppState();
}

class _MySchafoldAppState extends State<MySchafoldApp> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: const Text('PPK XEROSA'),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  margin: const EdgeInsets.all(25),
                  child: ElevatedButton(
                    onPressed: () =>
                        Navigator.of(context).pushNamed(SecondPage.routeName),
                    child: const Text('SECOND PAGE'),
                    style: ButtonStyle(
                      backgroundColor: MaterialStateProperty.all(Colors.green),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
      bottomNavigationBar: BottomAppBar(
        color: Colors.blue,
        child: Row(
          children: [
            const Spacer(flex: 2),
            IconButton(
              icon: const Icon(
                Icons.home,
                color: Colors.white,
              ),
              onPressed: () {
                print('FUNKEIRO SEXO ANAL');
              },
            ),
            const Spacer(),
            IconButton(
              icon: const Icon(
                Icons.navigate_next,
                color: Colors.white,
              ),
              onPressed: () {
                Navigator.of(context).pushNamed(SecondPage.routeName);
              },
            ),
            const Spacer(),
            IconButton(
              icon: const Icon(
                Icons.ac_unit,
                color: Colors.white,
              ),
              onPressed: () {
                Navigator.of(context).pushNamed(ThirdPage.routeName);
              },
            ),
            const Spacer(flex: 2),
          ],
        ),
      ),
    );
  }
}
