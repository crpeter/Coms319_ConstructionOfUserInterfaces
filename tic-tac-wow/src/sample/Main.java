package sample;

import javafx.application.Application;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.event.Event;
import javafx.event.EventHandler;
import javafx.geometry.Insets;
import javafx.scene.Node;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Priority;
import javafx.scene.layout.StackPane;
import javafx.stage.Stage;

import javax.xml.ws.handler.Handler;
import java.util.Random;


public class Main extends Application implements EventHandler<ActionEvent> {

    public GridPane grid;
    int cells[][] = new int[3][3];
    int moves = 0;

    public void handle(ActionEvent event) {
        try {
            Button thisBtn = (Button)event.getTarget();
            if (thisBtn.getId() != null) {
                System.out.println("reset");
            }
            if (thisBtn.getGraphic() == null) {
                updateCells(true);
                Image image = new Image(getClass().getResourceAsStream("x.jpg"), 20, 20, false, false);
                thisBtn.setGraphic(new ImageView(image));
                moves++;
                Random rand = new Random();
                boolean done = false;
                if (moves == 9) {
                    done = true;
                }
                while (!done) {
                    ((Label) getNode(3, 1, grid)).setText("comp turn");
                    int nextI = rand.nextInt(3);
                    int nextJ = rand.nextInt(3);
                    if (((Button) getNode(nextI, nextJ, grid)).getGraphic() == null) {
                        image = new Image(getClass().getResourceAsStream("o.jpg"), 20, 20, false, false);
                        ((Button) getNode(nextI, nextJ, grid)).setGraphic(new ImageView(image));
                        done = true;
                        cells[nextI][nextJ] = 0;
                        moves++;
                        //updateCells(false);
                    }
                }
                ((Label) getNode(3, 1, grid)).setText("player turn");
                System.out.println(cells);
                // check for user victory
                boolean won = false;
                int total = 1;
                for (int x = 0; x <= 2; x++) {
                    total = 1;
                    if (((Button) getNode(x, 0, grid)).getGraphic() == null) {

                    } else {
                        for (int y = 1; y <= 2; y++) {
                            if (((Button) getNode(x, y, grid)).getGraphic() != null && cells[x][y] == 1) {
                                System.out.println("good one at: " + x + ", " + y);
                                total++;
                            }
                        }
                    }
                    if (total == 3) {
                        won = true;
                        break;
                    }
                }
                if (!won) {
                    for (int y = 0; y <= 2; y++) {
                        total = 1;
                        if (((Button) getNode(0, y, grid)).getGraphic() == null) {

                        } else {
                            for (int x = 1; x <= 2; x++) {
                                if (((Button) getNode(x, y, grid)).getGraphic() != null && cells[x][y] == 1) {
                                    System.out.println("good one at: " + x + ", " + y);
                                    total++;
                                }
                            }
                        }
                        if (total == 3) {
                            won = true;
                            break;
                        }
                    }
                }
                if (!won) {
                    total = 0;
                    for (int i = 0; i < 3; i++) {
                        if (((Button) getNode(i, i, grid)).getGraphic() != null && cells[i][i] == 1) {
                            total++;
                        }
                    }
                    if (total == 3) {
                        System.out.println("won right diag");
                        won = true;
                    } else {
                        int j = 0;
                        total = 0;
                        for (int i = 2; i >= 0; i--, j++) {
                            if (((Button) getNode(i, j, grid)).getGraphic() != null && cells[i][j] == 1) {
                                total++;
                            }
                        }
                        if (total == 3) {
                            System.out.println("won left diag");
                            won = true;
                        }
                    }
                }
                if (won) {
                    ((Label) getNode(3, 3, grid)).setText("Player Won!");
                } else {
                    boolean compWon = false;
                    //check if comp won
                    for (int i = 0; i < cells.length; i++) {
                        total = 0;
                        for (int j = 0; j < cells[i].length; j++) {
                            if (cells[i][j] == 0) {
                                total++;
                            }
                        }
                        if (total == 3) {
                            ((Label) getNode(3, 3, grid)).setText("Computer Won!");
                            compWon = true;
                            break;
                        }
                    }
                    if (!compWon) {
                        for (int i = 0; i < cells.length; i++) {
                            total = 0;
                            for (int j = 0; j < cells[i].length; j++) {
                                if (cells[j][i] == 0) {
                                    total++;
                                }
                            }
                            if (total == 3) {
                                ((Label) getNode(3, 3, grid)).setText("Computer Won!");
                                compWon = true;
                                break;
                            }
                        }
                    }
                }
                System.out.println("total ver: " + total);
            }
        } catch (NumberFormatException e) {
            System.out.println("Invalid Inputs");
        }
    }

    public void updateCells(boolean user) {
        for (int i = 0; i < 3; i++) {
            for(int j = 0; j < 3; j++) {
                if (((Button)getNode(i, j, grid)).getGraphic() != null) {
                    if (cells[i][j] == -1) {
                        cells[i][j] = user ? 1:0;
                    }
                }
            }
        }
    }

    @Override
    public void start(Stage primaryStage) {
        for (int i = 0; i < cells.length; i++) {
            for (int j = 0; j < cells[i].length; j++) {
                cells[i][j] = -1;
            }
        }
        grid = new GridPane();
        grid.setPadding(new Insets(10, 10, 10, 10)); // margins around grid
        grid.setVgap(5); // vertical gap in pixels
        grid.setHgap(5);// horizontal gap in pixels

        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                Button button = new Button();
                button.setMaxWidth(20);
                button.setMaxHeight(20);
                button.setOnAction(this);
                button.setMaxWidth(Double.MAX_VALUE);
                button.setMaxHeight(Double.MAX_VALUE);
                grid.add(button, i, j);
                GridPane.setHgrow(button, Priority.ALWAYS);
                GridPane.setVgrow(button, Priority.ALWAYS);
            }
        }
        Label lab = new Label();
        Button reset = new Button();
        reset.setText("reset");
        reset.setId("poop");
        lab.setText("");
        Label lab2 = new Label();
        lab2.setText("player turn");
        grid.add(lab2, 1, 3);
        grid.add(lab, 3, 3);
        grid.add(reset, 2, 3);

        Scene scene = new Scene(grid, 350, 200);

        primaryStage.setTitle("Two Operations");
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    public Node getNode(final int row, final int column, GridPane gridPane) {
        Node result = null;
        ObservableList<Node> childrens = gridPane.getChildren();

        for (Node node : childrens) {
            if(gridPane.getRowIndex(node) == row && gridPane.getColumnIndex(node) == column) {
                result = node;
                break;
            }
        }

        return result;
    }

    public static void main(String[] args) {
        launch(args);
    }

}
