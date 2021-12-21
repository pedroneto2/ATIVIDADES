import 'package:flutter/material.dart';

class SecondPage extends StatefulWidget {
  static const routeName = 'second_page';

  @override
  State<SecondPage> createState() => _SecondPageState();
}

class _SecondPageState extends State<SecondPage> {
  int tileNumber = 1;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('SECOND PAGE'),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            ElevatedButton(
              onPressed: () {
                setState(() {
                  tileNumber++;
                });
              },
              child: const Text('ADD TILE'),
            ),
            ListView.builder(
              physics: const ScrollPhysics(parent: null),
              shrinkWrap: true,
              itemBuilder: (BuildContext context, int index) {
                return Container(
                  color: index.isEven ? Colors.orange : Colors.red,
                  child: const ListTile(
                    title: Text('TESTE'),
                    trailing: Icon(Icons.access_alarm_sharp),
                  ),
                );
              },
              itemCount: tileNumber,
            ),
          ],
        ),
      ),
    );
  }
}
