import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.GridPane;
import javafx.stage.Stage;

public class JavaFXExample3 extends Application {

	@Override
	public void start(Stage primaryStage) {

		GridPane grid = new GridPane();
		grid.setPadding(new Insets(10, 10, 10, 10)); // margins around grid
		grid.setVgap(5); // vertical gap in pixels
		grid.setHgap(5);// horizontal gap in pixels

		Label label1 = new Label("Value1:");
		grid.add(label1, 0, 0);
		TextField value1 = new TextField();
		grid.add(value1, 1, 0); // second column, first row

		Label label2 = new Label("Value2:");
		grid.add(label2, 0, 1);
		TextField value2 = new TextField();
		grid.add(value2, 1, 1);

		Button sum = new Button("Summation");
		grid.add(sum, 1, 2);
		Button multiply = new Button("Multiplication");
		grid.add(multiply, 2, 2);

		Label label3 = new Label("Result:");
		grid.add(label3, 0, 4);
		Label result = new Label();
		grid.add(result, 1, 4);

		sum.setOnAction(new EventHandler<ActionEvent>() {
			@Override
			public void handle(ActionEvent event) {
				try {
					result.setText((Double.parseDouble(value1.getText()) + Double.parseDouble(value2.getText())) + "");
				} catch (NumberFormatException e) {
					result.setText("Invalid Inputs");
				}
			}
		});
		multiply.setOnAction(new EventHandler<ActionEvent>() {
			@Override
			public void handle(ActionEvent event) {
				try {
					result.setText((Double.parseDouble(value1.getText()) * Double.parseDouble(value2.getText())) + "");
				} catch (NumberFormatException e) {
					result.setText("Invalid Inputs");
				}
			}
		});

		Scene scene = new Scene(grid, 350, 200);

		primaryStage.setTitle("Two Operations");
		primaryStage.setScene(scene);
		primaryStage.show();
	}

	public static void main(String[] args) {
		launch(args);
	}

}