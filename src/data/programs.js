export const programs = [
    {
        id: 1,
        title: "Display Welcome Message with Student Name",
        description: "Accept student name and display welcome message dynamically.",
        xml: `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="20dp"
    android:gravity="center_horizontal">

    <TextView
        android:id="@+id/welcomeMsg"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Welcome to Android Application"
        android:textSize="20sp"
        android:paddingBottom="20dp" />

    <EditText
        android:id="@+id/studentName"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Enter Student Name" />

    <Button
        android:id="@+id/submitBtn"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Click Me"
        android:layout_marginTop="20dp" />

</LinearLayout>`,
        java: `package com.example.lab01;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    private TextView welcomeMsg;
    private EditText studentName;
    private Button submitBtn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        welcomeMsg = findViewById(R.id.welcomeMsg);
        studentName = findViewById(R.id.studentName);
        submitBtn = findViewById(R.id.submitBtn);

        submitBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String name = studentName.getText().toString().trim();
                String message = "Welcome to Android Application " + name;
                welcomeMsg.setText(message);
            }
        });
    }
}`
    },
    {
        id: 2,
        title: "Terms & Conditions and Exit Confirmation",
        description: "Show T&C dialog on start and confirmation dialog on back press.",
        xml: `<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:id="@+id/helloText"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello World!"
        android:textSize="22sp"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>`,
        java: `package com.example.lab02;

import android.os.Bundle;
import android.widget.Toast;
import androidx.activity.OnBackPressedCallback;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        OnBackPressedCallback callback = new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                new AlertDialog.Builder(MainActivity.this)
                        .setTitle("Exit")
                        .setMessage("Do you really want to exit?")
                        .setPositiveButton("Yes", (dialog, which) -> finish())
                        .setNegativeButton("No", null)
                        .show();
            }
        };

        getOnBackPressedDispatcher().addCallback(this, callback);
    }

    @Override
    protected void onStart() {
        super.onStart();

        new AlertDialog.Builder(this)
                .setTitle("Terms & Conditions")
                .setMessage("Click OK to accept Terms and Conditions.")
                .setPositiveButton("OK", (dialog, which) ->
                        Toast.makeText(this, "Accepted", Toast.LENGTH_SHORT).show())
                .setNegativeButton("Cancel", (dialog, which) -> finish())
                .show();
    }
}`
    },
    {
        id: 3,
        title: "Progress Dialog Download",
        description: "Simulate file download using ProgressDialog.",
        xml: `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:orientation="vertical">

    <Button
        android:id="@+id/downloadBtn"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Download" />

</LinearLayout>`,
        java: `package com.example.lab03;

import android.app.ProgressDialog;
import android.os.Bundle;
import android.os.Handler;
import android.widget.Button;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    private ProgressDialog progressDialog;
    private int progressStatus = 0;
    private final Handler handler = new Handler();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button downloadBtn = findViewById(R.id.downloadBtn);
        downloadBtn.setOnClickListener(v -> showProgress());
    }

    private void showProgress() {
        progressDialog = new ProgressDialog(this);
        progressDialog.setTitle("Downloading");
        progressDialog.setMessage("Please wait...");
        progressDialog.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
        progressDialog.setMax(100);
        progressDialog.setCancelable(false);

        progressStatus = 0;
        progressDialog.show();

        new Thread(() -> {
            while (progressStatus < 100) {
                progressStatus++;
                handler.post(() ->
                        progressDialog.setProgress(progressStatus)
                );
                try {
                    Thread.sleep(50);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            handler.post(() -> progressDialog.dismiss());
        }).start();
    }
}`
    },
    {
        id: 4,
        title: "Open Website using Intent",
        description: "Open a website in browser using implicit intent.",
        xml: `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:orientation="vertical">

    <TextView
        android:id="@+id/urlTextView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="http://www.cmr.edu.in/"
        android:textSize="18sp"
        android:textColor="#0000FF" />

    <Button
        android:id="@+id/openBrowserBtn"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Open Website" />

</LinearLayout>`,
        java: `package com.example.lab04;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        TextView url = findViewById(R.id.urlTextView);
        Button button = findViewById(R.id.openBrowserBtn);

        button.setOnClickListener(v -> {
            String website = url.getText().toString();
            Intent intent = new Intent(Intent.ACTION_VIEW);
            intent.setData(Uri.parse(website));
            startActivity(intent);
        });
    }
}`
    },
    {
        id: 5,
        title: "Change Background Color Based on Orientation",
        description: "Change background color dynamically based on device orientation.",
        xml: `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    android:id="@+id/rootLayout"
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:orientation="vertical">

    <TextView
        android:id="@+id/statusText"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Orientation Status"
        android:textSize="22sp"
        android:textColor="#FFFFFF" />

</LinearLayout>`,
        java: `package com.example.lab05;

import android.content.res.Configuration;
import android.graphics.Color;
import android.os.Bundle;
import android.widget.LinearLayout;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    private LinearLayout rootLayout;
    private TextView statusText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        rootLayout = findViewById(R.id.rootLayout);
        statusText = findViewById(R.id.statusText);

        updateUI(getResources().getConfiguration().orientation);
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        updateUI(newConfig.orientation);
    }

    private void updateUI(int orientation) {

        if (orientation == Configuration.ORIENTATION_LANDSCAPE) {
            rootLayout.setBackgroundColor(Color.RED);
            statusText.setText("Landscape Mode");
        } else {
            rootLayout.setBackgroundColor(Color.GREEN);
            statusText.setText("Portrait Mode");
        }
    }
}`
    }
];
